var sourceData = "df_final.csv";
carregarValoresDropdown(sourceData, "Endereço", "locationDropdown1");
grafico_dispercao();


// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}
// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}


//gráfico de dispersão (teste)
/*
function grafico_dispercao(){
    d3.csv('df_final.csv').then(function(dados) {
        var apto = dados
        .map(d => ({ Endereço: d.Endereço, Preço: parseFloat(d.Preço), Área: parseFloat(d.Característica_1)}));
        console.log(apto);
    });
}
*/



function grafico_dispercao() {
    d3.csv('df_final.csv').then(function(dados) {
        var subjectValor1 = document.getElementById('locationDropdown1').value;
        var apto;

        if (subjectValor1 !== 'Quadra/Bairro (Todos)') {
            apto = dados.filter(d => d.Endereço === subjectValor1);
        } else {
            apto = dados; // Se subjectValor1 for 'todos', retorna todos os dados sem aplicar o filtro
        }

        //.filter(d => subjectValor1 !== 'todos' && d.Endereço === subjectValor1)
        apto = apto.map(d => ({Endereço: d.Endereço,Preço: parseFloat(d.Preço/1000000).toFixed(2), Área: parseFloat(d.Característica_1)}))
        console.log(apto);
    
        var chartDom = document.getElementById('aptoProfile');
        var myChart = echarts.init(chartDom);
        
        var option = {
            xAxis: {
                type: 'value' // Alterado para tipo 'value' para utilizar valores numéricos
            },
            yAxis: {
                type: 'value' // Alterado para tipo 'value' para utilizar valores numéricos
            },
            series: [{
                type: 'scatter',
                data: apto.map(d => [d.Área, d.Preço]),// Mapear os dados para o formato de coordenadas [x, y]
                symbolSize: 10, // Tamanho dos pontos
            }],

            tooltip: {
                position: 'top',
                formatter: '{c}'
              },
        };

        myChart.setOption(option);
    });
}


