with open('psusphere_data.json', 'r', encoding='utf-8') as f:
    data = f.read()
data = data.replace('studentorg.', 'dashboards.')
with open('psusphere_data.json', 'w', encoding='utf-8') as f:
    f.write(data)