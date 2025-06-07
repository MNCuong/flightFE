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
  if (index === -1) {
    selectedSeats.value.push(seatNumber)
    console.log(selectedSeats.value)
  } else selectedSeats.value.splice(index, 1)
}
function getSeatType(rowNumber) {
  return rowNumber <= 5 ? 'Business' : 'Economy';
}

async function loadSeatData(flightId) {
  if (!flightId) return;
  try {
    const flightRes = await axios.get(`/flights/flight/${flightId}`);
    const totalSeats = flightRes.data.data.seats || 0;

    const ticketRes = await axios.get(`/ticket/flight/${flightId}`);
    const bookedSeatSet = new Set(ticketRes.data.data.map(t => t.seatNumber));

    const seatMap = [];
    const seatsPerRow = 9;
    const fullRows = Math.floor(totalSeats / seatsPerRow);
    const remainingSeats = totalSeats % seatsPerRow;
    let rowIndex = 1;

    for (let i = 0; i < fullRows; i++) {
      const row = rows.map(letter => {
        const seatNumber = `${rowIndex}${letter}`;
        return {
          seatNumber,
          available: !bookedSeatSet.has(seatNumber),
          isBooked: bookedSeatSet.has(seatNumber),
          type: getSeatType(rowIndex)
        };
      });
      seatMap.push(row);
      rowIndex++;
    }

    if (remainingSeats > 0) {
      const row = [];
      for (let i = 0; i < remainingSeats; i++) {
        const seatNumber = `${rowIndex}${rows[i]}`;
        row.push({
          seatNumber,
          available: !bookedSeatSet.has(seatNumber),
          isBooked: bookedSeatSet.has(seatNumber),
          type: getSeatType(rowIndex)
        });
      }
      const fullRow = rows.map(letter =>
          row.find(s => s.seatNumber.endsWith(letter)) || null
      );
      seatMap.push(fullRow);
    }

    seatGrid.value = seatMap;
    seatPerColumn.value = seatMap.length;
    bookedSeats.value = ticketRes.data.data.map(t => t.seatNumber);

  } catch (err) {
    console.error('Lỗi khi tải dữ liệu ghế:', err);
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
                <div
                    v-if="seat"
                    :class="['seat-icon', {
    'selected': selectedSeats.includes(seat.seatNumber),
    'disabled': isSeatDisabled(seat.seatNumber),
    'booked': seat.isBooked,
    'business': seat.type === 'Business',
    'economy': seat.type === 'Economy'
  }]"
                    @click="!isSeatDisabled(seat.seatNumber) && toggleSeat(seat.seatNumber)"
                    style="cursor: pointer; user-select: none; display: flex; flex-direction: column; align-items: center;"
                    title="Ghế {{ seat.seatNumber }}"
                >
                  <v-icon large>mdi-seat-recline-normal</v-icon>
                  <span style="margin-top: 4px;">{{ seat.seatNumber }}</span>
                </div>
                <div v-else class="seat-placeholder ma-1"/>
              </template>

              <!--              <div v-else class="seat-placeholder ma-1"/>-->
            </div>
          </div>

          <div class="aisle"/>

          <div class="seat-block">
            <div v-for="(row, index) in seatGrid" :key="'middle-' + index" class="seat-row">
              <template v-for="(seat, i) in row.slice(3, 6)" :key="i">
                <div
                    v-if="seat"
                    :class="['seat-icon', {
    'selected': selectedSeats.includes(seat.seatNumber),
    'disabled': isSeatDisabled(seat.seatNumber),
    'booked': seat.isBooked,
    'business': seat.type === 'Business',
    'economy': seat.type === 'Economy'
  }]"
                    @click="!isSeatDisabled(seat.seatNumber) && toggleSeat(seat.seatNumber)"
                    style="cursor: pointer; user-select: none; display: flex; flex-direction: column; align-items: center;"
                    title="Ghế {{ seat.seatNumber }}"
                >
                  <v-icon large>mdi-seat-recline-normal</v-icon>
                  <span style="margin-top: 4px;">{{ seat.seatNumber }}</span>
                </div>
                <div v-else class="seat-placeholder ma-1"/>
              </template>
            </div>
          </div>

          <div class="aisle"/>

          <div class="seat-block">
            <div v-for="(row, index) in seatGrid" :key="'right-' + index" class="seat-row">
              <template v-for="(seat, i) in row.slice(6, 9)" :key="i">
                <div
                    v-if="seat"
                    :class="['seat-icon', {
    'selected': selectedSeats.includes(seat.seatNumber),
    'disabled': isSeatDisabled(seat.seatNumber),
    'booked': seat.isBooked,
    'business': seat.type === 'Business',
    'economy': seat.type === 'Economy'
  }]"
                    @click="!isSeatDisabled(seat.seatNumber) && toggleSeat(seat.seatNumber)"
                    style="cursor: pointer; user-select: none; display: flex; flex-direction: column; align-items: center;"
                    title="Ghế {{ seat.seatNumber }}"
                >
                  <v-icon large>mdi-seat-recline-normal</v-icon>
                  <span style="margin-top: 4px;">{{ seat.seatNumber }}</span>
                </div>
                <div v-else class="seat-placeholder ma-1"/>
              </template>
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

<style>
.seat-layout {
  gap: 30px !important;
}

.seat-block {
  display: flex !important;
  flex-direction: column !important;
}

.seat-row {
  display: flex !important;
}

.aisle {
  width: 30px !important;
}

.seat-icon {
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  font-size: 14px !important;
  padding: 0 !important;
  text-align: center !important;
  justify-content: center !important;
  border: 2px solid transparent !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
  color: #555 !important;
  background-color: white !important;
  user-select: none !important;
  margin: 4px !important;
}

.seat-icon.selected {
  border-color: #f44336 !important;
  background-color: #f11515 !important;
  color: #f44336 !important;
  font-weight: bold !important;
}

.seat-icon.booked {
  color: grey !important;
  background-color: white !important;
  cursor: default !important;
  border-color: #a8a8a8 !important;

}

.seat-icon.business {
  color: #a85de3 !important;
  border-color: #d9bffd !important;

}

.seat-icon.economy {
  color: #35d73a !important;
  border-color: #a9f8ae !important;

}

.seat-icon:hover:not(.booked):not(.selected) {
  border-color: #f44336 !important;
  color: #f44336 !important;
  background-color: #fbbbbb !important;
}


.seat-placeholder {
  width: 50px !important;
  height: 50px !important;
}
</style>
