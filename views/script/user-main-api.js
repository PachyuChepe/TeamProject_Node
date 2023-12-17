document.addEventListener('DOMContentLoaded', function () {
  fetchRestaurants();
});

let searchKeyword = '';

document.querySelector('input[type="text"]').addEventListener('input', (e) => {
  searchKeyword = e.target.value.toLowerCase();
});

document.querySelector('button').addEventListener('click', () => {
  filterAndDisplayRestaurants();
});

document
  .querySelector('input[type="text"]')
  .addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      filterAndDisplayRestaurants();
    }
  });

function fetchRestaurants() {
  axios
    .get('/api/store')
    .then((response) => {
      const stores = response.data.data.stores;
      const reviewCnt = response.data.data.storeReviewCounts;
      displayRestaurants(stores, reviewCnt);
    })
    .catch((error) => console.error('Error fetching restaurants:', error));
}

function filterAndDisplayRestaurants() {
  axios
    .get('/api/store')
    .then((response) => {
      const filteredRestaurants = response.data.data.stores.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchKeyword) ||
          restaurant.category.name.toLowerCase().includes(searchKeyword) ||
          restaurant.storeaddresses.toLowerCase().includes(searchKeyword) ||
          (restaurant.description &&
            restaurant.description.toLowerCase().includes(searchKeyword)),
      );
      const reviewCnt = response.data.data.storeReviewCounts.reviewCount;
      displayRestaurants(filteredRestaurants, reviewCnt);
    })
    .catch((error) => console.error('Error fetching restaurants:', error));
}

function displayRestaurants(restaurants, reviewCnt) {
  const container = document.getElementById('restaurants-container');
  container.innerHTML = ''; // Clear existing content
  restaurants.forEach((restaurant) => {
    // 해당 식당의 리뷰 개수 찾기
    const restaurantReviewCount =
      reviewCnt.find((review) => review.storeId === restaurant.id)
        ?.reviewCount || 0;
    const restaurantCard = createRestaurantCard(
      restaurant,
      restaurantReviewCount,
    );
    container.appendChild(restaurantCard);
  });
}

function createRestaurantCard(restaurant, restaurantReviewCount) {
  const imgHref =
    restaurant.imageUrl === null ? '../img/temp-img.png' : restaurant.imageUrl;
  const card = document.createElement('div');
  card.className = 'bg-white shadow rounded overflow-hidden';
  card.innerHTML = `
  <div id="main-card" onclick="location.href='/user-store-detail.html?id=${
    restaurant.id
  }'">
    <img src="${imgHref}" 
      alt="${restaurant.name}" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold">${restaurant.name}</h3>
      <p class="text-sm text-gray-600">Rating: ${
        restaurant.rating
          ? `★★★★★`.slice(0, restaurant.rating) +
            `☆☆☆☆☆`.slice(restaurant.rating)
          : 'Not Rated'
      }</p>
      <p class="text-sm text-gray-600">Category: ${restaurant.category.name}</p>
      <p class="text-sm text-gray-600">Address: ${restaurant.storeaddresses}</p>
      <p class="text-sm text-gray-600">Description: ${
        restaurant.description ? restaurant.description : 'Not Available'
      }</p>
      <div class="flex justify-between items-center mt-4">
        <span class="text-sm text-gray-600">Reviews : ${restaurantReviewCount}</span>
      </div>
    </div>
  </div>
`;
  return card;
}
