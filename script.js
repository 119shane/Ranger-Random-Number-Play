    // Function to generate random numbers without duplicates
    function generateNumbers() {
        var rangeStart = parseInt(document.getElementById('rangeStart').value);
        var rangeEnd = parseInt(document.getElementById('rangeEnd').value);
  
        var numbers = [];
        while (numbers.length < 50) {
          var number = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
          if (!numbers.includes(number)) {
            numbers.push(number);
          }
        }
  
        displayNumbers(numbers);
      }
  
      // Function to display generated numbers
      function displayNumbers(numbers) {
        var numberContainer = document.getElementById('numberContainer');
        numberContainer.innerHTML = '';
  
        for (var i = 0; i < numbers.length; i++) {
          var numberElement = document.createElement('span');
          numberElement.setAttribute('class', 'number');
          numberElement.setAttribute('onclick', 'selectNumber(' + numbers[i] + ')');
          numberElement.textContent = numbers[i];
          numberContainer.appendChild(numberElement);
        }
      }
  
      // Function to select a number
      function selectNumber(number) {
        var selectedNumbers = JSON.parse(localStorage.getItem('selectedNumbers')) || [];
        var index = selectedNumbers.indexOf(number);
  
        if (index === -1 && selectedNumbers.length < 10) {
          selectedNumbers.push(number);
        } else if (index !== -1) {
          selectedNumbers.splice(index, 1);
        }
  
        localStorage.setItem('selectedNumbers', JSON.stringify(selectedNumbers));
        displaySelectedNumbers(selectedNumbers);
  
        generateUrl(selectedNumbers);
        displayGeneratedUrls();
      }
  
      // Function to display selected numbers
      function displaySelectedNumbers(selectedNumbers) {
        var numberContainer = document.getElementById('numberContainer');
        var numberElements = numberContainer.getElementsByClassName('number');
  
        for (var i = 0; i < numberElements.length; i++) {
          var number = parseInt(numberElements[i].textContent);
          if (selectedNumbers.includes(number)) {
            numberElements[i].classList.add('selected');
          } else {
            numberElements[i].classList.remove('selected');
          }
        }
  
        var selectedNumbersContainer = document.getElementById('selectedNumbers');
        selectedNumbersContainer.innerHTML = selectedNumbers.join(', ');
  
        var addResult = document.getElementById('addResult');
        addResult.textContent = 'Addition Result: ' + selectedNumbers.reduce((a, b) => a + b, 0);
  
        var multiplyResult = document.getElementById('multiplyResult');
        multiplyResult.textContent = 'Multiplication Result: ' + selectedNumbers.reduce((a, b) => a * b, 1);
      }
  
      // Function to generate a URL for the selected numbers
      function generateUrl(selectedNumbers) {
        var url = 'https://example.com/result?numbers=' + selectedNumbers.join(',');
        var generatedUrls = JSON.parse(localStorage.getItem('generatedUrls')) || [];
        generatedUrls.push(url);
        localStorage.setItem('generatedUrls', JSON.stringify(generatedUrls));
      }
  
      // Function to display generated URLs
      function displayGeneratedUrls() {
        var generatedUrls = JSON.parse(localStorage.getItem('generatedUrls')) || [];
        var generatedUrlsContainer = document.getElementById('generatedUrls');
        generatedUrlsContainer.innerHTML = '';
  
        generatedUrls.forEach(function(url) {
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          link.href = url;
          link.textContent = url;
          listItem.appendChild(link);
          generatedUrlsContainer.appendChild(listItem);
        });
      }
  
      // Load selected numbers and generated URLs on page load
      window.onload = function() {
        var selectedNumbers = JSON.parse(localStorage.getItem('selectedNumbers')) || [];
        displaySelectedNumbers(selectedNumbers);
  
        displayGeneratedUrls();
      };