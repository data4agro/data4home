alert("Hello!")
console.log("Hello!")
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
        var apto = dados.map(d => ({ 
            Endereço: d.Endereço, 
            Preço: parseFloat(d.Preço), 
            Área: parseFloat(d.Característica_1)
        }));
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
                    
                    

            }]
        };

        myChart.setOption(option);
    });
}

grafico_dispercao()