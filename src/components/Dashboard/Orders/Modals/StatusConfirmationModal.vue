<template>
    <div v-if="showConfirmationModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-4">Confirm Payment</h2>
            <p class="mb-4">
                Do you want to change order's status to «Paid»?
            </p>
            <div class="flex justify-end">
                <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                    @click="confirmChange"
                >
                    Change
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    @click="cancelConfirmation"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: 'StatusConfirmationModal',
        data() {
            return {
                showConfirmationModal: this.showConfirmation
            }
        },
        props: {
            showConfirmation: {
                type: Boolean,
                default: null,
            }
        },
        methods: {
            confirmChange() {
                this.$emit('confirm');
            },
            cancelConfirmation() {
                this.$emit('cancel');
            }
        }
    })
</script>

<style>

</style>