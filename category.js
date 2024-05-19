const categoryNode = document.querySelector('.js-category');


categoryNode.addEventListener('click', function () {

 //let calegoryList = ['транспорт', 'кафе и рестораны','аптека','c'];
 categoryNode.innerHTML = 'транспорт';
 categoryNode.innerHTML = 'кафе и рестораны';
 categoryNode.innerHTML = 'аптека';
 categoryNode.innerHTML = 'развлечения';

}) 