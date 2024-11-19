<template>
    <div class="container">
      <h1 class="text-center my-4">Список продуктов</h1>
      <button class="btn btn-add mb-3" @click="showCreateForm = !showCreateForm">
        {{ showCreateForm ? 'Скрыть форму' : 'Добавить продукт' }}
      </button>
  
      <div v-if="showCreateForm" class="card p-3 mb-3">
        <h3>Создать новый продукт</h3>
        <div class="form-group mb-2">
          <input v-model="newProduct.name" class="form-control" placeholder="Название продукта" />
        </div>
        <div class="form-group mb-2">
          <select v-model="newProduct.productTypeId" class="form-control">
            <option v-for="type in productTypes" :key="type.id" :value="type.id">{{ type.productType }}</option>
          </select>
        </div>
        <div class="form-group mb-2">
          <select v-model="newProduct.productStatusId" class="form-control">
            <option v-for="status in productStatuses" :key="status.id" :value="status.id">{{ status.productStatus }}</option>
          </select>
        </div>
        <button class="btn btn-create" @click="createProduct">Создать</button>
      </div>
  
      <ul class="list-group">
        <li v-for="product in products" :key="product.id" class="list-group-item d-flex justify-content-between align-items-center product-card">
          <div>
            <strong class="product-name">{{ product.name }}</strong>
            <span class="badge badge-type">{{ getProductTypeName(product.productTypeId) }}</span>
            <span class="badge badge-status">{{ getProductStatusName(product.productStatusId) }}</span>
          </div>
          <div>
            <button class="btn btn-outline-primary me-2" @click="editProduct(product)">Редактировать</button>
            <button class="btn btn-outline-danger" @click="deleteProduct(product.id)">Удалить</button>
          </div>
        </li>
      </ul>
  
      <div v-if="editFormVisible" class="card p-3 mt-3 edit-form">
        <h3>Редактировать продукт</h3>
        <div class="form-group mb-2">
          <input v-model="editProductData.name" class="form-control" placeholder="Название продукта" />
        </div>
        <div class="form-group mb-2">
          <select v-model="editProductData.productTypeId" class="form-control">
            <option v-for="type in productTypes" :key="type.id" :value="type.id">{{ type.productType }}</option>
          </select>
        </div>
        <div class="form-group mb-2">
          <select v-model="editProductData.productStatusId" class="form-control">
            <option v-for="status in productStatuses" :key="status.id" :value="status.id">{{ status.productStatus }}</option>
          </select>
        </div>
        <button class="btn btn-save" @click="updateProduct">Сохранить</button>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchAllProducts, createProduct, updateProduct, deleteProduct, fetchAllProductTypes, fetchAllProductStatuses } from '../services/api';
  
  export default {
    data() {
      return {
        products: [],
        productTypes: [],
        productStatuses: [],
        newProduct: { name: '', productTypeId: '', productStatusId: '' },
        editProductData: null,
        showCreateForm: false,
        editFormVisible: false,
      };
    },
    async created() {
      this.products = await fetchAllProducts();
      this.productTypes = await fetchAllProductTypes();
      this.productStatuses = await fetchAllProductStatuses();
    },
    methods: {
      getProductTypeName(typeId) {
        const type = this.productTypes.find(t => t.id === typeId);
        return type ? type.productType : 'Неизвестный тип';
      },
      getProductStatusName(statusId) {
        const status = this.productStatuses.find(s => s.id === statusId);
        return status ? status.productStatus : 'Неизвестный статус';
      },
      async createProduct() {
        const createdProduct = await createProduct(this.newProduct);
        this.products.push(createdProduct);
        this.newProduct = { name: '', productTypeId: '', productStatusId: '' };
        this.showCreateForm = false;
      },
      editProduct(product) {
        this.editProductData = { ...product };
        this.editFormVisible = true;
      },
      async updateProduct() {
        await updateProduct(this.editProductData.id, this.editProductData);
        const index = this.products.findIndex(p => p.id === this.editProductData.id);
        this.products.splice(index, 1, this.editProductData);
        this.editFormVisible = false;
      },
      async deleteProduct(id) {
        await deleteProduct(id);
        this.products = this.products.filter(product => product.id !== id);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #333;
  }
  
  .card {
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .product-name {
    font-size: 1.2em;
    font-weight: bold;
    color: #007bff;
  }
  
  .badge {
    margin-left: 8px;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 0.9em;
  }
  
  .badge-type {
    background-color: #6c757d;
    color: white;
  }
  
  .badge-status {
    background-color: #28a745;
    color: white;
  }
  
  .btn {
    border-radius: 25px;
    padding: 8px 15px;
    font-weight: bold;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .btn-add {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    border: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .btn-create {
    background: linear-gradient(135deg, #00c6ff, #0072ff);
    color: white;
    border: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .btn-outline-primary {
    color: #007bff;
    border: 1px solid #007bff;
    background-color: transparent;
    transition: all 0.3s ease;
  }
  
  .btn-outline-primary:hover {
    background-color: #007bff;
    color: white;
  }
  
  .btn-outline-danger {
    color: #dc3545;
    border: 1px solid #dc3545;
    background-color: transparent;
  }
  
  .btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
  }
  
  .btn-save {
    background: linear-gradient(135deg, #43e97b, #38f9d7);
    color: white;
    border: none;
    box-shadow: 0px 4px 8px rgba(67, 233, 123, 0.5);
  }
  
  .btn-save:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(67, 233, 123, 0.7);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .text-muted {
    color: #6c757d;
  }
  </style>