<template>
    <div class="container">
      <h1 class="text-center my-4">Список типов продуктов</h1>
      <button class="btn btn-add mb-3" @click="showCreateForm = !showCreateForm">
        {{ showCreateForm ? 'Скрыть форму' : 'Добавить тип' }}
      </button>
  
      <div v-if="showCreateForm" class="card p-3 mb-3">
        <h3>Создать новый тип</h3>
        <div class="form-group mb-2">
          <input v-model="newType.productType" class="form-control" placeholder="Название типа" />
        </div>
        <button class="btn btn-create" @click="createType">Создать</button>
      </div>
  
      <ul class="list-group">
        <li v-for="type in types" :key="type.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong class="type-name">{{ type.productType }}</strong>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-primary me-2" @click="editType(type)">Редактировать</button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteType(type.id)">Удалить</button>
          </div>
        </li>
      </ul>
  
      <div v-if="editFormVisible" class="card p-3 mt-3">
        <h3>Редактировать тип</h3>
        <div class="form-group mb-2">
          <input v-model="editTypeData.productType" class="form-control" placeholder="Название типа" />
        </div>
        <button class="btn btn-save" @click="updateType">Сохранить</button>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchAllProductTypes, createProductType, updateProductType, deleteProductType } from '../services/api';
  
  export default {
    data() {
      return {
        types: [],
        newType: { productType: '' },
        editTypeData: null,
        showCreateForm: false,
        editFormVisible: false,
      };
    },
    async created() {
      this.types = await fetchAllProductTypes();
    },
    methods: {
      async createType() {
        const createdType = await createProductType(this.newType);
        this.types.push(createdType);
        this.newType = { productType: '' };
        this.showCreateForm = false;
      },
      editType(type) {
        this.editTypeData = { ...type };
        this.editFormVisible = true;
      },
      async updateType() {
        await updateProductType(this.editTypeData.id, this.editTypeData);
        const index = this.types.findIndex(t => t.id === this.editTypeData.id);
        this.types.splice(index, 1, this.editTypeData);
        this.editFormVisible = false;
      },
      async deleteType(id) {
        await deleteProductType(id);
        this.types = this.types.filter(type => type.id !== id);
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
  
  .type-name {
    font-size: 1.2em;
    font-weight: bold;
    color: #007bff;
  }
  
  .btn {
    border: none;
    border-radius: 25px;
    padding: 8px 15px;
    color: white;
    font-weight: bold;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .btn-add {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
  }
  
  .btn-create {
    background: linear-gradient(135deg, #00c6ff, #0072ff);
  }
  
  .btn-outline-primary {
    color: #007bff;
    border: 1px solid #007bff;
    background-color: transparent;
  }
  
  .btn-outline-danger {
    color: #dc3545;
    border: 1px solid #dc3545;
    background-color: transparent;
  }
  .btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}
  
  .btn-save {
    background: linear-gradient(135deg, #43e97b, #38f9d7);
    padding: 10px 20px;
    font-size: 1em;
    font-weight: bold;
    color: white;
    border-radius: 25px;
    box-shadow: 0px 6px 12px rgba(67, 233, 123, 0.5);
  }
  
  .btn-save:hover {
    background: linear-gradient(135deg, #38f9d7, #43e97b);
    transform: translateY(-2px);
    box-shadow: 0px 8px 16px rgba(67, 233, 123, 0.7);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  </style>
  