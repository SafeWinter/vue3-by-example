<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons v-slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div id="container">
        <ion-list>
          <ion-item v-for="(h, index) of historyWithTypes" :key="h.id">
            <ion-label v-if="h.type === 'tip'">
              Tip Calculation - Subtotal: {{ h.subtotal }}, Country:
              {{ h.country }}
            </ion-label>
            <ion-label v-else>
              Currency Conversion - Amount {{ h.amount }},
              {{ h.fromCurrency }} to {{ h.toCurrency }}
            </ion-label>
            <ion-button @click="go(h)">Open</ion-button>
            <ion-button @click="deleteEntry(index)">Delete</ion-button>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
} from '@ionic/vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { CurrencyConversion, TipCalculation } from '@/interfaces';
import { useRouter } from 'vue-router';
type HistoryEntry = CurrencyConversion | TipCalculation;

export default {
  name: 'Home',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonButton,
    IonList,
    IonItem,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const history = computed(() => store.state.history);
    const historyWithTypes = computed(() =>
      history.value.map(
        (history: HistoryEntry): HistoryEntry & { type: string } => ({
          ...history,
          type: 'subtotal' in history ? 'tip' : 'conversion',
        })
      )
    );

    const go = (history: HistoryEntry & { type: string }) => {
      const { type, id } = history;
      const path = type === 'tip' ? '/tips-calculator' : '/currency-converter';
      router.push({ path, query: { id } });
    };

    const deleteEntry = (index: number) => {
      store.commit('removeHistoryEntry', index);
    };

    return {
      history,
      historyWithTypes,
      go,
      deleteEntry,
    };
  },
};
</script>
