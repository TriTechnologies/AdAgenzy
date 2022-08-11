import boto3
import requests
import json
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
from decimal import *

dynamodb = boto3.resource("dynamodb", region_name='us-east-1')
table = dynamodb.Table('adagenzytable-dev')

arrr = []

def default_json(t):
    return f'{t}'

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

    # print(len(item['Items']))
    # return json.dumps('List')


    for xyz in item['Items']:
        barcode = xyz['ProductData']['Product_Barcode']
        Product_Link = xyz['ProductData']['Product_Link']     

        if barcode is None:
                continue
        else:
    
                Comptitor = []
                gtin_code = barcode
                params = {
                    'api_key': '7F8E102F85D1471F9114BE9AF5FCFDCB',
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
                                    "Comp_Store": store_name,
                                    "Comp_Store_Link": store_links,
                                    "Comp_prod_delivery_price": competitor_delivery,
                                    "Comp_Prod_Price": comp_price.text
                                }
                                

                                Comptitor.append(l)


                        else:
                            tttt = "We can't find Competitor's from this Product"
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


            