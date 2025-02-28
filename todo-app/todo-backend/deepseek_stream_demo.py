import requests
import os
import json
apikey = os.getenv('APIKEY')

headers = {
	"Authorization": f"Bearer {apikey}",
    "Content-Type": "application/json"
}

ask = input("ask:")
print(ask.encode(encoding='utf-8').decode(encoding='utf-8'))

url = 'https://api.deepseek.com/chat/completions'
payload =  {
	"model": "deepseek-reasoner",
	"messages" : [{
		"content" : ask,
		"role" : "user"
	}],
    "stream" : True
}

response = requests.post(
	url=url,
	headers=headers,
	json=payload,
	stream=True
)
reasoning_content = 'reasoning : '
real_content = 'real_content : '
for line in response.iter_lines():
    if line :
        decoded_line = line.decode('utf-8').strip()
        if decoded_line.startswith('data:'):
            json_str = decoded_line[5:].strip()
            if json_str == "[DONE]":
                break
            try:
                data = json.loads(json_str)
                if data['choices'][0]['delta'].get('reasoning_content') is not None:
                    reasoning_content += data['choices'][0]['delta'].get('reasoning_content','')
                else:
                    content = data['choices'][0]['delta'].get('content', '')
                    real_content += content
                    print(content, end='', flush=True)
            except json.JSONDecodeError:
                print("\n解析错误")
print('\n')
print(reasoning_content)
print(real_content)