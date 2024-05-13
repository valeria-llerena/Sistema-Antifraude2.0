from flask import Flask, render_template, request
import requests
import matplotlib.pyplot as plt
import numpy as np
import base64
import io


app = Flask(__name__)
from flask import send_from_directory

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.root_path, 'favicon.ico', mimetype='image/vnd.microsoft.icon')

# Función para generar el gráfico circular
def generar_grafico_circular(fraud_count, non_fraud_count):
    labels = ['Fraudulentas', 'No Fraudulentas']
    sizes = [fraud_count, non_fraud_count]
    colors = ['red', 'green']
    explode = (0.1, 0)  # Destacar la primera rebanada

    plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
    plt.axis('equal')  # Asegura que el gráfico sea un círculo
    plt.title('Porcentaje de Transacciones')

    # Convertir la figura de Matplotlib a datos base64
    img_data = io.BytesIO()
    plt.savefig(img_data, format='png')
    img_data.seek(0)
    img_base64 = base64.b64encode(img_data.getvalue()).decode()

    return img_base64
def generar_grafico_horizontal(hours):
    # Crear una figura y un eje
    fig, ax = plt.subplots()

    # Crear el gráfico horizontal
    ax.barh(range(len(hours)), hours, color='skyblue')

    # Establecer las etiquetas y el título
    ax.set_yticks(range(len(hours)))
    ax.set_yticklabels(['Hora {}'.format(i) for i in range(len(hours))])  # Etiquetas de las horas del día
    ax.set_xlabel('Cantidad de Transacciones')
    ax.set_ylabel('Hora del Día')
    ax.set_title('Transacciones por Hora')

    # Mostrar el gráfico
    plt.tight_layout()
    img_data = io.BytesIO()
    plt.savefig(img_data, format='png')
    img_data.seek(0)
    img_base64 = base64.b64encode(img_data.getvalue()).decode()
    return img_base64
# Ruta para la página principal
@app.route('/')
def index():
    return render_template('index.html')
# Ruta para la página de reportes
@app.route('/reportes')
def reportes():
    try:
        # Obtener los datos de todas las transacciones desde el backend de Node.js
        response = requests.get('http://localhost:5000/api/report')
        data = response.json()

        # Obtener los recuentos de transacciones fraudulentas y no fraudulentas
        fraud_count = data['fraudData']['fraudCount']
        non_fraud_count = data['fraudData']['nonFraudCount']
        hours = data['hours']

        print(hours)
        # Generar el gráfico circular con los datos procesados
        img_base64 = generar_grafico_circular(fraud_count, non_fraud_count)
        #img_base64_horizontal = generar_grafico_horizontal(hours)

        # Renderizar la plantilla de reportes y pasarle los datos de la imagen del gráfico circular
        return render_template('reportes.html',imagen2=img_base64)
        #return render_template('reportes.html' imagen=img_base64_horizontal)

    except Exception as e:
        print('Error al obtener los datos de las transacciones:', e)
        return render_template('error.html', error='Error al obtener los datos de las transacciones')


if __name__ == '__main__':
    app.run(debug=True, port=8000)
