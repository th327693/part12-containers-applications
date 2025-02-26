import requests


id = '67beed5dc0203feea751e944'

content = {
	'newtext' : 'oldtext',
	'newdone' : False
}

res = requests.put(f"http://localhost:3000/todos/{id}",json=content)

print( str(res.status_code) + res.reason )
if res.status_code < 400 :
	print(res.content)
	print(res.headers.get('content-type'))