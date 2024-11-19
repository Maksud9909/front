<template>
  <div>
    <nav>
      <router-link to="/products">Продукты</router-link> |
      <router-link to="/types">Типы продуктов</router-link> |
      <router-link to="/statuses">Статусы продуктов</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  text-align: center;
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>
