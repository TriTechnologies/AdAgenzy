from time import process_time_ns
from flask_cors import CORS
from flask import Flask, jsonify, request
import awsgi
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('adagenzytable-dev')

# Constant variable with path prefix
BASE_ROUTE = "/items"

app = Flask(__name__)
CORS(app)

@app.route(BASE_ROUTE + '/listproducts', methods=['GET'])
def list_products():
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
    return jsonify(item)
@app.route(BASE_ROUTE + '/listcompetitors', methods=['GET'])
def list_competitors():
    comp_arr = []
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
    for i in item['Items']:
        if i['ProductData']['Product_Barcode'] != None:
             for c in i['CompetitorData']:
                comp_list = {
                    'Comp_Store' : c['Comp_Store'],
                    'Comp_Store_Link': c['Comp_Store_Link']
                }
                comp_arr.append(comp_list)                             
        else:
                continue

    return jsonify(comp_arr)  


@app.route(BASE_ROUTE + '/repricing', methods=['GET'])
def repricing():
    re_price = []
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
    for r in item['Items']:
        if r['ProductData']['Product_Barcode'] != None:
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
        'StoreData': request_json['StoreData'],
    })
    return jsonify(message="store created")      

# @app.route(BASE_ROUTE + '/updateproduct', methods=['PUT'])
# def update_product():
#     request_json = request.get_json()

#     wcapi.put("products/32779", data).json()

#     table.update_item(

#         Key={"PK": request_json['PK'],
#              'SK': 'products'},
#         UpdateExpression='SET #ProductData = :Email, #Status = :Status',
#         ExpressionAttributeNames={
#             '#Email': 'Email',
#             '#Status': 'Status'

#         },
#         ExpressionAttributeValues={
#             ":Email": request_json['Email'],
#             ":Status": request_json['Status']
#         }
#     )
#     return jsonify(message="item updated")    






def handler(event, context):
    return awsgi.response(app, event, context)

   
