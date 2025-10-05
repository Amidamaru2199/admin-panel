<template>
  <TheDialog ref="dialogRef">
    <template #trigger>
      <slot name="trigger" />
    </template>

    <template #title>{{ dialogTitle }}</template>

    <template #description>{{ dialogDescription }}</template>

    <template #body>
      <form id="server-form" @submit.prevent="handleSave" class="servers__dialog-form">
        <div class="servers__dialog-grid">
          <div class="servers__dialog-group">
            <div class="servers__dialog-grid-item">
              <label for="">Название</label>
              <input v-model="formData.name" placeholder="Название" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">Страна</label>
              <input v-model="formData.country" placeholder="Страна" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">Код</label>
              <input v-model="formData.code" placeholder="Код" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">IP адрес</label>
              <input v-model="formData.ip" placeholder="IP адрес" type="text" />
            </div>

            <NumberFieldRoot class="servers__dialog-grid-item" v-model="formData.vless_inbound_id">
              <NumberFieldDecrement class="servers__dialog-decrement">
                <TheMinus />
              </NumberFieldDecrement>
              <label for="">VLESS Inbound ID</label>
              <NumberFieldInput />
              <NumberFieldIncrement class="servers__dialog-increment">
                <ThePlus />
              </NumberFieldIncrement>
            </NumberFieldRoot>

            <div class="servers__dialog-grid-item">
              <label for="">Публичный ключ</label>
              <input v-model="formData.public_key" placeholder="Публичный ключ" type="text" />
            </div>
            <div class="servers__dialog-grid-item servers__dialog-grid-item_switcher">
              <TheSwitcher v-model="formData.is_active" />
              <span>Активный</span>
            </div>
          </div>
          <div class="servers__dialog-group">
            <div class="servers__dialog-grid-item">
              <label for="">Порт панели</label>
              <input v-model="formData.port_panel" placeholder="Порт панели" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">URL путь к панели</label>
              <input v-model="formData.uri_path" placeholder="URL путь к панели" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">Пароль к панели</label>
              <input v-model="formData.password" placeholder="Пароль к панели" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">Порт inbound</label>
              <input v-model="formData.port_key" placeholder="Порт inbound" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">Короткий ID</label>
              <input v-model="formData.short_id" placeholder="Короткий ID" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
              <label for="">Вес</label>
              <input v-model.number="formData.weight" placeholder="Вес" type="number" step="0.1" />
            </div>
            <div class="servers__dialog-grid-item servers__dialog-grid-item_switcher">
              <TheSwitcher v-model="formData.is_excluded" />
              <span>Искл. из распределения</span>
            </div>
          </div>
        </div>
        <div class="servers__dialog-grid-item">
          <label for="">Описание</label>
          <input v-model="formData.description" placeholder="Описание" type="text" />
        </div>
        <div class="servers__dialog-grid-item">
          <label for="">Инфо (не видно пользователям)</label>
          <input v-model="formData.info" placeholder="Инфо" type="text" />
        </div>
      </form>
    </template>

    <template #footer>
      <button type="submit" form="server-form" class="servers__dialog-save-button"
        :disabled="usersStore.isLoading || !isFormValid">
        {{ buttonText }}
      </button>
    </template>
  </TheDialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import TheDialog from '@/components/ui/TheDialog.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'
import TheMinus from '@/components/icons/TheMinus.vue'
import ThePlus from '@/components/icons/ThePlus.vue'
import { useUsersStore } from '@/stores/index'

const props = defineProps({
  mode: {
    type: String,
    default: 'create', // 'create' или 'edit'
    validator: (value) => ['create', 'edit'].includes(value)
  },
  serverData: {
    type: Object,
    default: null // Данные сервера для редактирования
  }
})

const usersStore = useUsersStore()
const dialogRef = ref(null)

// Реактивные данные формы
const formData = ref({
  name: '',
  country: '',
  code: '',
  ip: '',
  vless_inbound_id: 1,
  public_key: '',
  is_active: false,
  port_panel: '',
  uri_path: '',
  password: '',
  port_key: '',
  short_id: '',
  weight: 0,
  is_excluded: false,
  description: '',
  info: ''
})

// Computed свойства для заголовков
const dialogTitle = computed(() => {
  return props.mode === 'edit' ? 'Редактирование сервера' : 'Добавление сервера'
})

const dialogDescription = computed(() => {
  return props.mode === 'edit' ? 'Измените данные сервера' : 'Укажите данные сервера'
})

const buttonText = computed(() => {
  if (usersStore.isLoading) {
    return props.mode === 'edit' ? 'Сохранение...' : 'Создание...'
  }
  return props.mode === 'edit' ? 'Сохранить изменения' : 'Сохранить'
})

// Computed свойство для проверки валидности формы
const isFormValid = computed(() => {
  const requiredFields = [
    'name',
    'country',
    'code',
    'ip',
    'port_panel',
    'uri_path',
    'password',
    'port_key'
  ]

  // Проверяем, что все обязательные поля заполнены
  const allRequiredFieldsFilled = requiredFields.every(field =>
    formData.value[field] && formData.value[field].toString().trim() !== ''
  )

  // Проверяем, что VLESS Inbound ID больше 0
  const validVlessId = formData.value.vless_inbound_id > 0

  // Проверяем, что вес больше 0
  const validWeight = formData.value.weight > 0

  return allRequiredFieldsFilled && validVlessId && validWeight
})

// Функция для заполнения формы данными сервера
const populateForm = (server) => {
  if (!server) return

  const vlessId = server.vless_inbound_id !== undefined ? Number(server.vless_inbound_id) : 1

  formData.value = {
    name: server.name || '',
    country: server.country || '',
    code: server.code || '',
    ip: server.ip || '',
    vless_inbound_id: vlessId,
    public_key: server.public_key || '',
    is_active: server.is_active !== undefined ? server.is_active : false,
    port_panel: server.port_panel || '',
    uri_path: server.uri_path || '',
    password: server.password || '',
    port_key: server.port_key || '',
    short_id: server.short_id || '',
    weight: server.weight || 0,
    is_excluded: server.is_excluded !== undefined ? server.is_excluded : false,
    description: server.description || '',
    info: server.info || ''
  }
}

// Watcher для открытия диалога - заполняем форму только когда диалог открывается
watch(() => dialogRef.value?.isOpen, (isOpen) => {
  if (isOpen && props.mode === 'edit' && props.serverData) {
    populateForm(props.serverData)
  }
})

const handleSave = async () => {
  try {
    // Подготавливаем данные для отправки
    const serverData = {
      ...formData.value,
      user_count: props.mode === 'edit' ? props.serverData?.user_count || 0 : 0,
      cookie: props.mode === 'edit' ? props.serverData?.cookie || 'session=' : 'session='
    }

    // Вызываем соответствующий метод в зависимости от режима
    if (props.mode === 'edit') {
      await usersStore.editServer(props.serverData.id, serverData)
    } else {
      await usersStore.addServer(serverData)
    }

    // Закрываем диалог после успешного сохранения
    if (dialogRef.value) {
      dialogRef.value.isOpen = false
    }

    // Сбрасываем форму только при создании
    if (props.mode === 'create') {
      resetForm()
    }
  } catch (error) {
    console.error('Error saving server:', error)
  }
}

const resetForm = () => {
  formData.value = {
    name: '',
    country: '',
    code: '',
    ip: '',
    vless_inbound_id: 1,
    public_key: '',
    is_active: false,
    port_panel: '',
    uri_path: '',
    password: '',
    port_key: '',
    short_id: '',
    weight: 0,
    is_excluded: false,
    description: '',
    info: ''
  }
  // Все значения уже сброшены в formData выше
}
</script>

<style lang="scss">
.servers__dialog-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.servers__dialog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.servers__dialog-group {
  display: grid;
  align-content: flex-start;
  gap: 12px;
}

.servers__dialog-increment,
.servers__dialog-decrement {
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  width: 20px;
  height: 10px;
}

.servers__dialog-increment {
  bottom: 22px;
}

.servers__dialog-decrement {
  bottom: 10px;
}

.servers__dialog-grid-item {
  display: flex;
  flex-direction: column;
  position: relative;

  &_switcher {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  &:hover {

    .servers__dialog-increment,
    .servers__dialog-decrement {
      display: flex;
    }
  }

  span,
  label {
    margin: 0 0 8px;
    font-size: 14px;
    line-height: 1;
    font-weight: 500;
    color: hsl(0 0% 98%);
  }

  span {
    margin: 0;
  }

  .required {
    color: hsl(0 62.8% 30.6%);
    font-weight: 600;
  }

  input {
    height: 40px;
    padding-inline: 12px;
    border-width: 1px;
    border-radius: 6px;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    line-height: 1;
    font-weight: 500;
    color: hsl(0 0% 98%);

    &:focus {
      border: 1px solid hsl(0 0% 98%);
    }
  }
}

.servers__dialog-save-button {
  height: 40px;
  padding-inline: 16px;
  border-radius: 6px;
  color: hsl(240 5.9% 10%);
  background-color: hsl(0 0% 98%);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: hsl(240 5% 64.9%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: hsl(240 5% 64.9%);
  }
}
</style>
