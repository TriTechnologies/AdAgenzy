from decimal import Decimal
from email import message
from time import process_time_ns
from flask_cors import CORS
from flask import Flask, jsonify, request
import awsgi
import boto3
from woocommerce import API
import requests
from bs4 import BeautifulSoup
import json

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('adagenzytable-dev')

# Constant variable with path prefix
BASE_ROUTE = "/items"

app = Flask(__name__)
CORS(app)

@app.route(BASE_ROUTE + '/listproducts' + '/<UserID>', methods=['GET'])
def list_products(UserID):
    storeItem = table.query(
        IndexName='GSI1',
        KeyConditionExpression='#SK = :value',
        ExpressionAttributeValues={
            ':value': 'store'
        },
        ExpressionAttributeNames={
            '#SK': 'SK'
        }
    )

    for store in storeItem['Items']:
        if UserID in store['UsersData']:
            storeID = store['PK']
        
        else:
            return jsonify(message="No store attached")

    item = table.query(
        IndexName='StoreID-SK-index',
        KeyConditionExpression='#StoreID = :val AND #SK = :value',
        ExpressionAttributeValues={
            ':val': storeID,
            ':value': 'products'
        },
        ExpressionAttributeNames={
            '#StoreID': 'StoreID',
            '#SK': 'SK'
        }
    )
    
    return jsonify(item)

@app.route(BASE_ROUTE + '/listcompetitors' + '/<UserID>', methods=['GET'])
def list_competitors(UserID):
    comp_arr = []
    storeItem = table.query(
        IndexName='GSI1',
        KeyConditionExpression='#SK = :value',
        ExpressionAttributeValues={
            ':value': 'store'
        },
        ExpressionAttributeNames={
            '#SK': 'SK'
        }
    )

    for store in storeItem['Items']:
        if UserID in store['UsersData']:
            storeID = store['PK']
        
        else:
            return jsonify(message="No store attached")

    item = table.query(
        IndexName='StoreID-SK-index',
        KeyConditionExpression='#StoreID = :val AND #SK = :value',
        ExpressionAttributeValues={
            ':val': storeID,
            ':value': 'products'
        },
        ExpressionAttributeNames={
            '#StoreID': 'StoreID',
            '#SK': 'SK'
        }
    )

    for i in item['Items']:
        if i['CompetitorData'] != None:
            print(i)
            for c in i['CompetitorData']:
                comp_list = {
                    'Competitor_Store' : c['Competitor_Store'],
                    'Competitor_Store_Link': c['Competitor_Store_Link']
                }
                comp_arr.append(comp_list)  

        else:
            continue

    return jsonify(comp_arr)  

@app.route(BASE_ROUTE + '/listrepricing'  + '/<UserID>', methods=['GET'])
def listrepricing(UserID):
    re_price = []
    storeItem = table.query(
        IndexName='GSI1',
        KeyConditionExpression='#SK = :value',
        ExpressionAttributeValues={
            ':value': 'store'
        },
        ExpressionAttributeNames={
            '#SK': 'SK'
        }
    )

    for store in storeItem['Items']:
        if UserID in store['UsersData']:
            storeID = store['PK']
        
        else:
            return jsonify(message="No store attached")

    item = table.query(
        IndexName='StoreID-SK-index',
        KeyConditionExpression='#StoreID = :val AND #SK = :value',
        ExpressionAttributeValues={
            ':val': storeID,
            ':value': 'products'
        },
        ExpressionAttributeNames={
            '#StoreID': 'StoreID',
            '#SK': 'SK'
        }
    )

    for r in item['Items']:
        if r['CompetitorData'] != None:
            re_price.append(r)
                
        else:
            continue
    return jsonify(re_price)            

@app.route(BASE_ROUTE + '/attachstore', methods=['POST'])
def attach_store():
    request_json = request.get_json()

    table.put_item( 
      Item={
        'PK': request_json['PK'],
        'SK': 'store',
        'Platform': 'WooCommerce',
        'StoreData': request_json['StoreData'],
        'UsersData': request_json['UsersData']
    })
    return jsonify(message="Store Attached")

@app.route(BASE_ROUTE + '/addproducts', methods=['POST'])
def add_products():
    total_prod = []
    request_json = request.get_json()
    UserID = request_json['UserID']

    item = table.query(
        IndexName='GSI1',
        KeyConditionExpression='#SK = :value',

        ExpressionAttributeValues={
            ':value': 'store'
        },
        ExpressionAttributeNames={
            '#SK': 'SK'
        }
    )

    for store in item['Items']:
        if UserID in store['UsersData']:
            StoreData = store
        else:
            return jsonify(message="No store found")

    wcapi = API(
        url = StoreData['StoreData']['url'],
        consumer_key = StoreData['StoreData']['consumerkey'],
        consumer_secret = StoreData['StoreData']['consumersecret'],
        wp_api = True,
        version = "wc/v3",
        timeout=50
    )
    # page = 1
    # while True:
    products = wcapi.get('products', params={'per_page': 40, 'page': 1}).json()
    for s in products:
        prod_id = s['id']
        prod_sku = s['sku']
        prod_name = s['name']
        prod_link = s['permalink']
        prod_barcode = s['barcode']
        prod_price = s['price']
        prod_stock = s['stock_status']
        image = s['images']
        print(image)
        categories = s['categories']
        brands = s['brands']
        category_arr = []
        brand_arr = []
        for c in categories:
            category = c['name']
            category_arr.append(category)
        for b in brands:
            brand = b['name']
            brand_arr.append(brand)
        prod_image = ""    
        for i in image:
            prod_image = i['src']
            print(prod_image)
            break
        prod_json = {
            'Product_ID' : prod_id,
            'Product_SKU' : prod_sku,
            'PRODUCT_NAME' : prod_name,
            'Product_Link' : prod_link,
            'Product_Image' : prod_image,
            'Product_Price' : prod_price,
            'Product_Stock' : prod_stock,
            'Product_Barcode' : prod_barcode,
            'Categories': category_arr,
            'Brands': brand_arr

        }
        total_prod.append(prod_json)

    # if len(products) == 0:
    #     break
    # page = page + 1

    print("Products Store", len(total_prod))
    i = 0

    for product in total_prod:
        i = i + 1
        table.put_item(
            Item={
                "PK": str(i),
                "SK": "products",
                'CompetitorData': None,
                "ProductData": product,
                "StoreID": StoreData['PK']
            }
        )

    return jsonify(message="Products Added")

@app.route(BASE_ROUTE + '/addcompetitors', methods=['GET'])
def add_competitors():
    arrr = []

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

    for xyz in item['Items']:
        barcode = xyz['ProductData']['Product_Barcode']
        Product_Link = xyz['ProductData']['Product_Link']     

        if barcode is None:
            continue

        else:
            gtin_code = barcode
            params = {
                'api_key': 'A07D7AC7279D48D48CE66127059FD501',
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
                Comptitor = []
                # print the CSV response from Scale SERP
                results = api_result.content.decode()
                json_stats = json.loads(results)
                shoping_result = json_stats['shopping_results']
                Product_Link = ""
                for product in shoping_result:
                    if product['has_compare_prices'] == True:   
                        Product_Link = product['link']

                        r = requests.get(Product_Link+'?gl=dk')
                        soup = BeautifulSoup(r.content, 'html.parser')
                        # Capture the Competitor have different div name
                        mydivs = soup.find_all("div", {"class": "t9KcM"})
                        # capture the Competitor from different div 
                        last = soup.find(class_="qEeQL")
                        if last is None:
                            continue
                        
                        else:
                            last_p = last.find(class_="WwE9ce")
                            last_d = last.find(class_="izR5zd")
                            last_links = last.find('a')
                            print(last_links.text)
                            print(last_p.text)

                            if last_d is None:
                                last_d = "None"
                                print(last_d)

                            else:
                                last_d = last_d.text.split('.')[0]
                                last_d = last_d.split('+')[-1]
                                print(last_d)

                            last_store_links = last_links['href']
                            #  CLEAN the LINKS
                            ch = 'q='
                            # Remove all characters before the character 'q=' from string
                            last_store_links = last_store_links.split(ch, 1)[-1]
                            ch = '&'
                            # Remove all characters after the character '&' from string
                            last_store_links = last_store_links.split(ch, 1)[0]
                            ch = '%'
                            # Remove all characters after the character '&' from string
                            last_store_links = last_store_links.split(ch, 1)[0]
                            print(last_store_links)

                            ll = {
                                "Competitor_Store": last_links.text,
                                "Competitor_Store_Link": last_store_links,
                                "Competitor_product_delivery": last_d,
                                "Competitor_Product_Price": last_p.text
                            }

                            Comptitor.append(ll)

                        # Capture the Competitor have same div name         
                        for x in mydivs:
                            comp_price = x.find(class_="WwE9ce")
                            comp_delivery = x.find(class_="izR5zd")
                            store_links = x.find('a')
                            store_name = store_links.text

                            if comp_delivery is None:
                                competitor_delivery = "None"

                            else:
                                cd = comp_delivery.text.split('.')[0]
                                competitor_delivery = cd.split('+')[-1]

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

                            l = {
                                "Competitor_Store": store_name,
                                "Competitor_Store_Link": store_links,
                                "Competitor_product_delivery": competitor_delivery,
                                "Competitor_Product_Price": comp_price.text
                            }
                            
                            Comptitor.append(l)

                    else:
                        tttt = "We can't find Competitor's from this Product"
                        
                if (Comptitor == []):   
                    table.update_item(
                        Key={"PK": xyz['PK'],
                            'SK': 'products'},
                        UpdateExpression='SET #ProductData = :ProductData, #CompetitorData = :CompetitorData',
                        ExpressionAttributeNames={
                            '#ProductData': 'ProductData',
                            '#CompetitorData': 'CompetitorData'

                        },
                        ExpressionAttributeValues={
                            ":ProductData": xyz['ProductData'],
                            ":CompetitorData": None
                        }
                    )

                else:
                    table.update_item(
                        Key={"PK": xyz['PK'],
                            'SK': 'products'},
                        UpdateExpression='SET #ProductData = :ProductData, #CompetitorData = :CompetitorData',
                        ExpressionAttributeNames={
                            '#ProductData': 'ProductData',
                            '#CompetitorData': 'CompetitorData'

                        },
                        ExpressionAttributeValues={
                            ":ProductData": xyz['ProductData'],
                            ":CompetitorData": Comptitor
                        }
                    )

            else:
                tt = "Barcode data is Not found through google Merchant"

            total = {
                gtin_code : Comptitor
            }

            arrr.append(total) 

    print("ALL Lenght COMPETITORS",len(arrr))
    print("ALL COMPETITORS", arrr)

    return jsonify(message="Added Competitors")

@app.route(BASE_ROUTE + '/updateprice', methods=['PUT'])
def update_price():
    request_json = request.get_json()

    storeItem = table.query(
        IndexName='GSI1',
        KeyConditionExpression='#SK = :value',
        ExpressionAttributeValues={
            ':value': 'store'
        },
        ExpressionAttributeNames={
            '#SK': 'SK'
        }
    )

    for store in storeItem['Items']:
        if request_json['UserID'] in store['UsersData']:
            storeData = store['StoreData']
        
        else:
            return jsonify(message="No store found")


    wcapi = API(
    url = storeData['url'],
    consumer_key = storeData['consumerkey'],
    consumer_secret = storeData['consumersecret'],
    version = "wc/v3"
)

    data = {
            "regular_price": request_json['ProductData']['ProductData']['Product_Price'],
        }

    wcapi.put("products/" + request_json['ProductData']['ProductData']['Product_ID'], data).json()

    table.update_item(

        Key={'PK': request_json['ProductData']['PK'],
             'SK': 'products'},
        UpdateExpression='SET #ProductData = :ProductData, #CompetitorData = :CompetitorData, #StoreID = :StoreID',
        ExpressionAttributeNames={
            '#ProductData': 'ProductData',
            '#CompetitorData': 'CompetitorData',
            '#StoreID': 'StoreID'

        },
        ExpressionAttributeValues={
            ":ProductData": request_json['ProductData']['ProductData'],
            ":CompetitorData": request_json['ProductData']['CompetitorData'],
            ":StoreID": request_json['ProductData']['StoreID']
        }
    )

    return jsonify(message="Product Updated")

def handler(event, context):
    return awsgi.response(app, event, context)
