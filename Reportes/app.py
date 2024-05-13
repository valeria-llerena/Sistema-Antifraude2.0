from flask import Flask, render_template
import matplotlib.pyplot as plt
import numpy as np
import plotly.graph_objs as go
import io
import base64

app = Flask(__name__)



# Ruta para la página principal
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para la página de reportes
@app.route('/reportes')
def reportes():
    # Simulación de datos de transacciones fraudulentas
    transacciones_fraudulentas = np.random.randint(0, 100, 30)
    numero_transacciones = np.random.randint(50, 200, 30)
    horas = np.arange(0, 24)
    transacciones_por_hora = np.random.randint(0, 200, 24)
    usuarios_conectados = np.random.randint(10, 50, 24)

    # Crear gráficos simulados con Matplotlib
    fig, axs = plt.subplots(2, 2, figsize=(12, 10))
    axs[0, 0].bar(horas, transacciones_por_hora)
    axs[0, 0].set_title('Hora de Mayor Transacciones')
    axs[0, 0].set_xlabel('Hora')
    axs[0, 0].set_ylabel('Número de Transacciones')

    axs[0, 1].plot(horas, usuarios_conectados, color='orange')
    axs[0, 1].set_title('Usuarios Conectados')
    axs[0, 1].set_xlabel('Hora')
    axs[0, 1].set_ylabel('Usuarios')

    axs[1, 0].bar(['Fraudulentas', 'No Fraudulentas'], [np.sum(transacciones_fraudulentas), np.sum(numero_transacciones)-np.sum(transacciones_fraudulentas)], color=['red', 'green'])
    axs[1, 0].set_title('Transacciones Fraudulentas')
    axs[1, 0].set_ylabel('Número de Transacciones')

    axs[1, 1].pie([np.sum(transacciones_fraudulentas), np.sum(numero_transacciones)-np.sum(transacciones_fraudulentas)], labels=['Fraudulentas', 'No Fraudulentas'], autopct='%1.1f%%', colors=['red', 'green'])
    axs[1, 1].set_title('Porcentaje de Transacciones')

    # Convertir la figura de Matplotlib a datos base64
    img_data = io.BytesIO()
    plt.savefig(img_data, format='png')
    img_data.seek(0)
    img_base64 = base64.b64encode(img_data.getvalue()).decode()

    # Grafico con Plotly para mostrar en la web
    trace = go.Bar(x=horas, y=transacciones_por_hora, marker=dict(color='blue'))
    plotly_fig = go.Figure(data=[trace])
    plotly_fig.update_layout(title='Hora de Mayor Transacciones', xaxis_title='Hora', yaxis_title='Número de Transacciones')
    plotly_grafico = plotly_fig.to_html(full_html=False)

    # Renderizar la plantilla de reportes y pasarle los datos de la imagen y el gráfico Plotly
    return render_template('reportes.html', imagen=img_base64)

if __name__ == '__main__':
    app.run(debug=True)
