import boto3
import requests
import json
from bs4 import BeautifulSoup
from requests_html import HTMLSession
import lxml

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('adagenzytable-dev')

arrr = []

def handler(event, context):
    item = table.query(
        IndexName='GSI1',
        KeyConditionExpression='#SK = :value',

        ExpressionAttributeValues={
            ':value': 'products'
        },
        ExpressionAttributeNames={
            '#SK': 'SK'
        }
    )
    print(item)

    for abc in item['Items']:
        for xyz in abc['ProductData']:
            barcode = xyz['Product_Barcode']
            name = xyz['PRODUCT_NAME']
            price = xyz['Product_Price']
            
            print(barcode, name, price)
            if abc['Product_Barcode'] is None:
                continue
            else:
                print("Search From Barcode")
                barcode_list = []
                arr = []
                gtin_code = barcode
                params = {
                    'api_key': 'A11509235C3E444FAE0F2992497FED98',
                    'location': 'Denmark',
                    'search_type': 'shopping',
                    'q': gtin_code,
                    'output': 'json',
                    'device': 'desktop',
                    'gl': 'dk',
                    'hl': 'da',
                    'google_domain': 'google.dk'
                }

                # make the http GET request to Scale SERP

                api_result = requests.get('https://api.scaleserp.com/search', params)
                api_chk = str(api_result)

                if api_chk == "<Response [200]>":
                    print("Response 200")
                    # print the CSV response from Scale SERP
                    results = api_result.content.decode()
                    print("Result", results)
                    print("TYPE iS :: ", type(results))
                    json_stats = json.loads(results)
                    shoping_result = json_stats['shopping_results']
                    Product_Name = ""
                    Product_Link = ""
                    Product_Price = ""
                    Product_Image = ""
                    for product in shoping_result:
                        if product['has_compare_prices'] == True:
                            Product_Name = product['title']
                            print(Product_Name)
                            Product_Link = product['link']
                            print(Product_Link)
                            Product_Price = product['price']
                            print(Product_Price)
                            Product_Image = product['image']
                            print(Product_Image)

                        elif product['has_compare_prices'] == False:
                            Product_Name = product['title']
                            print(Product_Name)
                            Product_Link = product['link']
                            print(Product_Link)
                            Product_Price = product['price']
                            print(Product_Price)
                            Product_Image = product['image']
                            print(Product_Image)

                        else:
                            print("We can't find Competitor's from this Product")

                    data = []

                    url = Product_Link + '/offers?q=' + gtin_code + '&gl=dk&hl=en'
                    session = HTMLSession()

                    resp = session.get(url)
                    resp.html.render()
                    html = resp.html.html

                    soup = BeautifulSoup(html, 'html.parser')
                    table = soup.find('table', attrs={'class': 'dOwBOc'})

                    table_body = table.find('tbody')
                    rows = table_body.find_all('tr')
                    for row in rows:
                        sl = row.find("div", {"class": "kPMwsc"})
                        if sl is None:
                            continue
                        else:

                            store_links = sl.find('a')
                            store_name = str(store_links.text.strip())
                            ch = 'Opens'
                            # Remove all characters after the character 'Opens' from string
                            store_name = store_name.split(ch, 1)[0]
                            print(store_name)

                            store_links = sl.find('a')
                            store_links = store_links['href']
                            #  CLEAN the LINKS
                            ch = 'q='
                            # Remove all characters before the character 'q=' from string
                            store_links = store_links.split(ch, 1)[-1]
                            ch = '&'
                            # Remove all characters after the character '&' from string
                            store_links = store_links.split(ch, 1)[0]
                            ch = '%'
                            # Remove all characters after the character '&' from string
                            store_links = store_links.split(ch, 1)[0]
                            print(store_links)
                        cols = row.find_all('td')
                        cols = [ele for ele in cols]
                        loop = [ele.text.strip() for ele in cols if ele]
                        Competitor_details = loop[1]
                        print(Competitor_details)
                        competitor_price = loop[2]
                        print(competitor_price)

                        print("========================== NEXT STORE ===========================")

                        Final_Stats = {

                            "Product_Name": Product_Name,
                            "Product_Link": Product_Link,
                            "Product_Price": price,
                            "Product_Image": Product_Image,
                            "Competitor_Store": store_name,
                            "Competitor_Store_Link": store_links,
                            "Competitor_product_details": Competitor_details,
                            "Competitor_Product_Price": competitor_price

                        }

                        barcode_list.append(Final_Stats)

                else:
                    print("Barcode data is Not found through google Merchant")

                total = {
                    gtin_code : barcode_list
                }

                arrr.append(total)

            