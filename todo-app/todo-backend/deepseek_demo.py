import requests
import os
import json
apikey = os.getenv('APIKEY')

headers = {
	"Authorization": f"Bearer {apikey}",
    "Content-Type": "application/json"
}

url = 'https://api.deepseek.com/chat/completions'
payload =  {
	"model": "deepseek-reasoner",
	"messages" : [{
		"content" : u"该往deepseek充值多少钱？",
		"role" : "user"
	}]
}

response = requests.post(
	url=url,
	headers=headers,
	json=payload
)
print( str(response.status_code) + ' ' +response.reason)
result = json.loads(  response.content.decode(encoding='utf-8') )

print( 'token usage:' + str(result['usage']['total_tokens'] ) )

print( 'reasoning :' + result['choices'][0]['message']['reasoning_content'] )
print( 'answer :' + result['choices'][0]['message']['content'] )