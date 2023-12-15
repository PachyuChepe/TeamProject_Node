document.addEventListener('DOMContentLoaded', function () {
  fetchRestaurants();
});

function fetchRestaurants() {
  axios
    .get('/api/store')
    .then((response) => {
      const restaurants = response.data.data;
      const container = document.getElementById('restaurants-container');
      restaurants.forEach((restaurant) => {
        const restaurantCard = createRestaurantCard(restaurant);
        container.appendChild(restaurantCard);
      });
    })
    .catch((error) => console.error('Error fetching restaurants:', error));
}

function createRestaurantCard(restaurant) {
  console.log('뭐뭐들어옴?', restaurant);
  const card = document.createElement('div');
  card.className = 'bg-white shadow rounded overflow-hidden';
  card.innerHTML = `
  <img src="https://source.unsplash.com/random/400x300?restaurant&sig=${
    restaurant.id
  }" 
     alt="${restaurant.name}" class="w-full h-48 object-cover" />
<div class="p-4">
    <h3 class="text-lg font-semibold">${restaurant.name}</h3>
    <p class="text-sm text-gray-600">Rating: ${
      restaurant.rating
        ? `★★★★★`.slice(0, restaurant.rating) + `☆☆☆☆☆`.slice(restaurant.rating)
        : 'Not Rated'
    }</p>
    <p class="text-sm text-gray-600">Category: ${restaurant.foodtype}</p>
    <p class="text-sm text-gray-600">Address: ${restaurant.storeaddresses}</p>
    <p class="text-sm text-gray-600">Hours: ${
      restaurant.hours ? restaurant.hours : 'Not Available'
    }</p>
    <div class="flex justify-between items-center mt-4">
      <span class="text-sm text-gray-600">${
        restaurant.reviews ? restaurant.reviews + ' Reviews' : 'No Reviews'
      }</span>
      <span class="text-sm text-gray-600">${
        restaurant.comments ? restaurant.comments + ' Comments' : 'No Comments'
      }</span>
      <button class="text-blue-500 hover:text-blue-700">
        Favorite
      </button>
    </div>
</div>
`;
  return card;
}
