<script setup>
import {ref, watch, defineExpose} from 'vue'
import axios from '@/services/api.js'

const props = defineProps({
  modelValue: Boolean,
  flightId: Number,
  selected: Array
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const localDialogVisible = ref(props.modelValue)
const seatGrid = ref([])
const bookedSeats = ref([])
const selectedSeats = ref([])
const seat = ref('')
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
const seatPerColumn = ref(0)

watch(() => props.modelValue, (val) => {
  localDialogVisible.value = val
  if (val) {
    loadSeatData(props.flightId)
  }
})

function confirm() {
  emit('update:modelValue', false)
  emit('confirm', selectedSeats.value)
}

function isSeatDisabled(seatNumber) {
  return bookedSeats.value.includes(seatNumber)
}

function getSeatColor(seatNumber) {
  const rowNumber = parseInt(seatNumber.match(/^\d+/)[0])
  if (isSeatDisabled(seatNumber)) return 'grey'
  if (selectedSeats.value.includes(seatNumber)) return 'red'
  if (rowNumber >= 1 && rowNumber <= 5) return 'yellow'
  return 'primary'
}

function toggleSeat(seatNumber) {
  if (isSeatDisabled(seatNumber)) return
  const index = selectedSeats.value.indexOf(seatNumber)
  if (index === -1) selectedSeats.value.push(seatNumber)
  else selectedSeats.value.splice(index, 1)
}

async function loadSeatData(flightId) {
  if (!flightId) return
  try {
    const flightRes = await axios.get(`/flights/flight/${flightId}`)
    const totalSeats = flightRes.data.data.seats || 0

    const ticketRes = await axios.get(`/ticket/flight/${flightId}`)
    const bookedSeatSet = new Set(ticketRes.data.data.map(t => t.seatNumber))

    const seatMap = []
    const seatsPerRow = 9
    const fullRows = Math.floor(totalSeats / seatsPerRow)
    const remainingSeats = totalSeats % seatsPerRow
    let rowIndex = 1

    // Hàng đầy đủ 9 ghế
    for (let i = 0; i < fullRows; i++) {
      const row = rows.map(letter => {
        const seatNumber = `${rowIndex}${letter}`
        return {
          seatNumber,
          available: !bookedSeatSet.has(seatNumber)
        }
      })
      seatMap.push(row)
      rowIndex++
    }

    if (remainingSeats > 0) {
      const row = []
      for (let i = 0; i < remainingSeats; i++) {
        const seatNumber = `${rowIndex}${rows[i]}`
        row.push({
          seatNumber,
          available: !bookedSeatSet.has(seatNumber)
        })
      }

      const fullRow = rows.map(letter =>
          row.find(s => s.seatNumber.endsWith(letter)) || null
      )
      seatMap.push(fullRow)
    }

    seatGrid.value = seatMap
    seatPerColumn.value = seatMap.length
    bookedSeats.value = ticketRes.data.data.map(t => t.seatNumber)
    selectedSeats.value = [...props.selected]

  } catch (err) {
    console.error('Lỗi khi tải dữ liệu ghế:', err)
  }
}

defineExpose({loadSeatData})
</script>

<template>
  <v-dialog :model-value="localDialogVisible" max-width="1000px">
    <v-card>
      <v-card-title>Chọn ghế</v-card-title>
      <v-card-text>
        <div class="seat-layout d-flex justify-center">
          <div class="seat-block">
            <div v-for="(row, index) in seatGrid" :key="index" class="seat-row">
              <template v-for="(seat, i) in row.slice(0, 3)" :key="i">
                <v-btn
                    v-if="seat"
                    :color="getSeatColor(seat.seatNumber)"
                    :disabled="isSeatDisabled(seat.seatNumber)"
                    class="ma-1 seat-button"
                    @click="toggleSeat(seat.seatNumber)"
                >
                  {{ seat.seatNumber }}
                </v-btn>
                <div v-else class="seat-placeholder ma-1"/>
              </template>

<!--              <div v-else class="seat-placeholder ma-1"/>-->
            </div>
          </div>

          <div class="aisle"/>

          <div class="seat-block">
            <div v-for="(row, index) in seatGrid" :key="'middle-' + index" class="seat-row">
<!--              <v-btn-->
<!--                  v-for="seat in row.slice(3, 6)"-->
<!--                  :key="seat?.seatNumber || 'null2'"-->
<!--                  v-if="seat"-->
<!--                  :color="getSeatColor(seat.seatNumber)"-->
<!--                  :disabled="isSeatDisabled(seat.seatNumber)"-->
<!--                  class="ma-1 seat-button"-->
<!--                  @click="toggleSeat(seat.seatNumber)"-->
<!--              >-->
<!--                {{ seat.seatNumber }}-->
<!--              </v-btn>-->
              <template v-for="(seat, i) in row.slice(3, 6)" :key="i">
                <v-btn
                    v-if="seat"
                    :color="getSeatColor(seat.seatNumber)"
                    :disabled="isSeatDisabled(seat.seatNumber)"
                    class="ma-1 seat-button"
                    @click="toggleSeat(seat.seatNumber)"
                >
                  {{ seat.seatNumber }}
                </v-btn>
                <div v-else class="seat-placeholder ma-1"/>
              </template>

<!--              <div v-else class="seat-placeholder ma-1"/>-->
            </div>
          </div>

          <div class="aisle"/>

          <div class="seat-block">
            <div v-for="(row, index) in seatGrid" :key="'right-' + index" class="seat-row">
<!--              <v-btn-->
<!--                  v-for="seat in row.slice(6, 9)"-->
<!--                  :key="seat?.seatNumber || 'null3'"-->
<!--                  v-if="seat"-->
<!--                  :color="getSeatColor(seat.seatNumber)"-->
<!--                  :disabled="isSeatDisabled(seat.seatNumber)"-->
<!--                  class="ma-1 seat-button"-->
<!--                  @click="toggleSeat(seat.seatNumber)"-->
<!--              >-->
<!--                {{ seat.seatNumber }}-->
<!--              </v-btn>-->
              <template v-for="(seat, i) in row.slice(6, 9)" :key="i">
                <v-btn
                    v-if="seat"
                    :color="getSeatColor(seat.seatNumber)"
                    :disabled="isSeatDisabled(seat.seatNumber)"
                    class="ma-1 seat-button"
                    @click="toggleSeat(seat.seatNumber)"
                >
                  {{ seat.seatNumber }}
                </v-btn>
                <div v-else class="seat-placeholder ma-1"/>
              </template>

              <!--              <div v-else class="seat-placeholder ma-1"/>-->
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click="$emit('update:modelValue', false)">Hủy</v-btn>
        <v-btn color="primary" @click="confirm">Xác nhận</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.seat-layout {
  gap: 30px;
}

.seat-block {
  display: flex;
  flex-direction: column;
}

.seat-row {
  display: flex;
}

.aisle {
  width: 30px;
}

.seat-button {
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  font-size: 14px;
  padding: 0;
  text-align: center;
  justify-content: center;
}

.seat-placeholder {
  width: 50px;
  height: 50px;
}
</style>
