from uuid import uuid4
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
    
def handler(event, context):
    return awsgi.response(app, event, context)

@app.route(BASE_ROUTE + '/attachstore', methods=['POST'])
def attach_store():
    request_json = request.get_json()
    table.put_item( 
        Item={
        'PK': str(uuid4()),
        'SK': 'store',
        'StoreData': request_json['StoreData'],
    })
    return jsonify(message="store created")    