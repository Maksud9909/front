<template>
    <div class="container">
      <h1 class="text-center my-4">Список статусов продуктов</h1>
      <button class="btn btn-add mb-3" @click="showCreateForm = !showCreateForm">
        {{ showCreateForm ? 'Скрыть форму' : 'Добавить статус' }}
      </button>
  
      <div v-if="showCreateForm" class="card p-3 mb-3">
        <h3>Создать новый статус</h3>
        <div class="form-group mb-2">
          <input v-model="newStatus.productStatus" class="form-control" placeholder="Название статуса" />
        </div>
        <button class="btn btn-create" @click="createStatus">Создать</button>
      </div>
  
      <ul class="list-group">
        <li v-for="status in statuses" :key="status.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong class="status-name">{{ status.productStatus }}</strong>
          </div>
          <div>
            <button class="btn btn-outline-primary me-2" @click="editStatus(status)">Редактировать</button>
            <button class="btn btn-outline-danger" @click="deleteStatus(status.id)">Удалить</button>
          </div>
        </li>
      </ul>
  
      <div v-if="editFormVisible" class="card p-3 mt-3">
        <h3>Редактировать статус</h3>
        <div class="form-group mb-2">
          <input v-model="editStatusData.productStatus" class="form-control" placeholder="Название статуса" />
        </div>
        <button class="btn btn-save" @click="updateStatus">Сохранить</button>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchAllProductStatuses, createProductStatus, updateProductStatus, deleteProductStatus } from '../services/api';
  
  export default {
    data() {
      return {
        statuses: [],
        newStatus: { productStatus: '' },
        editStatusData: null,
        showCreateForm: false,
        editFormVisible: false,
      };
    },
    async created() {
      this.statuses = await fetchAllProductStatuses();
    },
    methods: {
      async createStatus() {
        const createdStatus = await createProductStatus(this.newStatus);
        this.statuses.push(createdStatus);
        this.newStatus = { productStatus: '' };
        this.showCreateForm = false;
      },
      editStatus(status) {
        this.editStatusData = { ...status };
        this.editFormVisible = true;
      },
      async updateStatus() {
        await updateProductStatus(this.editStatusData.id, this.editStatusData);
        const index = this.statuses.findIndex(s => s.id === this.editStatusData.id);
        this.statuses.splice(index, 1, this.editStatusData);
        this.editFormVisible = false;
      },
      async deleteStatus(id) {
        await deleteProductStatus(id);
        this.statuses = this.statuses.filter(status => status.id !== id);
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
  
  .status-name {
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
  