<template>
  <q-page class="flex column items-center">
    <h1>Recomendações</h1>
    <q-table class="table" :columns="columns" :data="recommendations" row-key="id"
             selection="single" :selected.sync="recommendationSelect" flat/>
    <q-pagination
      @input="loadRecommendations"
      v-model="pagination.page"
      color="grey-9"
      :max="pagination.pageNumber"
      :max-pages="5"
      :direction-links="true"
      :boundary-links="true"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      size="md"
      class="pagination"
    />
    <div class="recommendation-actions flex justify-center">
      <q-btn @click="toggleRecommendationDialog" class="btn" text-color="white" label="Calcular"/>
      <q-btn @click="toggleMatrixDialog" class="btn" text-color="white"
             label="Ver Matrix"/>
      <q-btn v-show="showActions" @click="toggleDeleteDialog" class="btn" text-color="white"
             label="Remover"/>
    </div>

    <q-dialog v-model="recommendationDialogVisible" persistent>
      <q-card class="recommendation-dialog-card column items-center">
        <q-card-section class="row items-center justify-center text-dialog">
          Gerar Recomendação
        </q-card-section>
        <q-form v-show="!loadingVisible" class="form flex column items-center"
                @submit="submitCreateRecommendation">
          <q-input class="input" outlined v-model="recommendationDialogForm.passingScore"
                   label="Nota de corte" type="number" step=".1"/>
          <q-input class="input" outlined v-model="recommendationDialogForm.decimalPrecision"
                   label="Precisão Decimal" type="number" max="5"/>
          <q-select v-model="recommendationDialogForm.algorithmId" label="Algoritmo"
                    :options="algorithmOptions" outlined class="input"/>
          <q-select v-model="recommendationDialogForm.offline" label="Tipo de Processamento"
                    :options="processRecommendationOptions" outlined class="input"/>
          <div class="recommendation-buttons-actions flex justify-around">
            <q-btn @click="toggleRecommendationDialog" class="btn" text-color="white"
                   label="Cancelar"/>
            <q-btn class="btn" text-color="white" label="Gerar" type="submit"/>
          </div>
        </q-form>
        <q-card-section v-show="loadingVisible" class="loading">
          <q-circular-progress
            indeterminate
            size="50px"
            color="orange"
            class="q-ma-md"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="matrixVisibleDialog" persistent>
      <q-card class="recommendation-matrix-dialog-card column items-center">
        <q-card-section class="row items-center text-dialog">
          Qual o código da matrix que será exibida?
        </q-card-section>
        <q-card-section class="column items-center matrix-fields">
          <q-form v-show="!loadingVisible" class="form flex column items-center"
                  @submit="showMatrices">
            <q-input class="input" outlined v-model="matrixId"
                     label="Código" type="number" required/>
            <div class="recommendation-buttons-actions flex justify-around">
              <q-btn @click="toggleMatrixDialog" class="btn" text-color="white"
                     label="Cancelar"/>
              <q-btn class="btn" text-color="white" label="Buscar" type="submit"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover a recomendação?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteRecommendation" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import RecommendationService from 'src/service/RecommendationService';
import notify from 'src/helper/notify';

const algorithmOptions = [
  {
    label: 'Colaborativo',
    value: 1,
  },
  {
    label: 'Conteúdo',
    value: 2,
  },
  {
    label: 'H. Ponderado (S)',
    value: 3,
  },
  {
    label: 'H. Misto (S)',
    value: 4,
  },
  {
    label: 'H. Ponderado (M)',
    value: 5,
  },
  {
    label: 'H. Misto (M)',
    value: 6,
  },
];

const processRecommendationOptions = [
  {
    label: 'Online',
    value: true,
  },
  {
    label: 'Offline',
    value: false,
  },
];

const formatAlgorithm = (algorithmId) => {
  switch (algorithmId) {
    case 1:
      return 'Colaborativo';
    case 2:
      return 'Conteúdo';
    case 3:
      return 'H. Ponderado (S)';
    case 4:
      return 'H. Misto (S)';
    case 5:
      return 'H. Ponderado (M)';
    case 6:
      return 'H. Misto (M)';
    default:
      return 'Indefinido';
  }
};

const columns = [
  {
    name: 'id',
    field: 'id',
    label: 'Código',
    align: 'center',
    sortable: true,
    style: 'width: 80px',
    headerStyle: 'width: 80px',
  },
  {
    name: 'weight',
    field: 'weight',
    label: 'Nota',
    align: 'center',
    sortable: true,
  },
  {
    name: 'algorithmId',
    field: 'algorithmId',
    label: 'Algoritmo',
    align: 'center',
    format: formatAlgorithm,
    sortable: true,
  },
];

export default {
  name: 'ListRecommendations',
  computed: {
    showActions() {
      return this.recommendationSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      algorithmOptions,
      processRecommendationOptions,
      recommendations: [],
      recommendationSelect: [],
      recommendationDialogForm: {
        algorithmId: null,
        passingScore: 4,
        offline: null,
        decimalPrecision: 2,
      },
      matrixId: null,
      recommendationDialogVisible: false,
      deleteDialogVisible: false,
      loadingVisible: false,
      matrixVisibleDialog: false,
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async submitCreateRecommendation() {
      this.loadingVisible = true;
      const recommendationService = new RecommendationService();

      try {
        this.recommendationDialogForm.algorithmId = this.recommendationDialogForm.algorithmId.value;
        this.recommendationDialogForm.offline = this.recommendationDialogForm.offline.value;
        this.recommendationDialogForm.projectId = this.$store.getters['navigationInfo/getProjectId'];
        await recommendationService.create(this.recommendationDialogForm);
      } catch (e) {
        notify('negative', 'Verifique se todos os campos estão preenchidos corretamente');
      } finally {
        this.loadingVisible = false;
        this.toggleRecommendationDialog();
      }
    },
    toggleMatrixDialog() {
      this.matrixVisibleDialog = !this.matrixVisibleDialog;
    },
    async showMatrices() {
      await this.$router.push(`/projetos/recomendacoes/matrix/${this.matrixId}`);
    },
    async loadRecommendations(page = 1) {
      const apiPage = page - 1;
      const recommendationService = new RecommendationService();
      const resp = await recommendationService.list(apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].recommendations) {
        // eslint-disable-next-line dot-notation
        this.recommendations = resp['_embedded'].recommendations;
      }
    },
    toggleRecommendationDialog() {
      this.recommendationDialogVisible = !this.recommendationDialogVisible;
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteRecommendation() {
      const recommendationService = new RecommendationService();
      const recommendationId = this.recommendationSelect[0].id;
      await recommendationService.remove(recommendationId);
      await this.loadRecommendations();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadRecommendations();
  },
};
</script>

<style scoped>

</style>
