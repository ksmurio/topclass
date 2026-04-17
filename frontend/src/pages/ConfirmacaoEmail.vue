<template>
  <div class="confirm-wrapper">
    <div class="confirm-box">

      <div class="email-icon"><v-icon>mdi-email-outline</v-icon></div>

      <h2>Verifica o teu email</h2>
      <p class="subtitle">
        Enviámos um código de 6 dígitos para o teu email.<br>
        Abre o terminal do servidor para ver o link do email.
      </p>

      <input
        v-model="code"
        type="text"
        maxlength="6"
        placeholder="_ _ _ _ _ _"
        class="code-input"
        @keyup.enter="verificar"
      />

      <p v-if="erro" class="erro">{{ erro }}</p>

      <button @click="verificar" :disabled="loading" class="btn-verificar">
        {{ loading ? 'A verificar...' : 'Confirmar conta' }}
      </button>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConfirmacaoEmail',
  data() {
    return {
      code: '',
      erro: '',
      loading: false,
    };
  },
  computed: {
    userId() {
      return this.$route.query.userId;
    }
  },
  methods: {
    async verificar() {
      this.erro = '';

      if (this.code.length !== 6) {
        this.erro = 'Introduz o código de 6 dígitos.';
        return;
      }

      this.loading = true;
      try {
        const res = await axios.post('http://localhost:3000/api/auth/verify-email', {
          userId: this.userId,
          code: this.code,
        });

        if (res.data.success) {
          this.$router.push('/');
        }
      } catch (err) {
        this.erro = err.response?.data?.message || 'Código inválido. Tenta novamente.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.confirm-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.confirm-box {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.email-icon {
  font-size: 60px;
  margin-bottom: 16px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #1a1a2e;
}

.subtitle {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 28px;
}

.code-input {
  width: 100%;
  padding: 14px;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 12px;
  text-align: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.code-input:focus {
  border-color: #1a73e8;
}

.erro {
  color: #e53e3e;
  font-size: 13px;
  margin-top: 10px;
}

.btn-verificar {
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  background: #1a73e8;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-verificar:hover:not(:disabled) {
  background: #659df1;
}

.btn-verificar:disabled {
  background: #a0c4f1;
  cursor: not-allowed;
}
</style>