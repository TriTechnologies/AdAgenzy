import time
import boto3
import uuid

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('adagenzytable-dev')

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