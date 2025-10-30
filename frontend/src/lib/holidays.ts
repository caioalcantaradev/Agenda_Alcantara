// Lista de feriados nacionais brasileiros
export interface Holiday {
  name: string;
  date: Date;
  type: 'national' | 'regional' | 'optional';
}

export const nationalHolidays: Holiday[] = [
  { name: 'Ano Novo', date: new Date(2024, 0, 1), type: 'national' },
  { name: 'Carnaval', date: new Date(2024, 1, 12), type: 'national' },
  { name: 'Carnaval', date: new Date(2024, 1, 13), type: 'national' },
  { name: 'Sexta-feira Santa', date: new Date(2024, 2, 29), type: 'national' },
  { name: 'Tiradentes', date: new Date(2024, 3, 21), type: 'national' },
  { name: 'Dia do Trabalhador', date: new Date(2024, 4, 1), type: 'national' },
  { name: 'Independência', date: new Date(2024, 8, 7), type: 'national' },
  { name: 'Nossa Senhora Aparecida', date: new Date(2024, 9, 12), type: 'national' },
  { name: 'Finados', date: new Date(2024, 10, 2), type: 'national' },
  { name: 'Proclamação da República', date: new Date(2024, 10, 15), type: 'national' },
  { name: 'Natal', date: new Date(2024, 11, 25), type: 'national' },
  
  // 2025
  { name: 'Ano Novo', date: new Date(2025, 0, 1), type: 'national' },
  { name: 'Carnaval', date: new Date(2025, 2, 3), type: 'national' },
  { name: 'Carnaval', date: new Date(2025, 2, 4), type: 'national' },
  { name: 'Sexta-feira Santa', date: new Date(2025, 3, 18), type: 'national' },
  { name: 'Tiradentes', date: new Date(2025, 3, 21), type: 'national' },
  { name: 'Dia do Trabalhador', date: new Date(2025, 4, 1), type: 'national' },
  { name: 'Independência', date: new Date(2025, 8, 7), type: 'national' },
  { name: 'Nossa Senhora Aparecida', date: new Date(2025, 9, 12), type: 'national' },
  { name: 'Finados', date: new Date(2025, 10, 2), type: 'national' },
  { name: 'Proclamação da República', date: new Date(2025, 10, 15), type: 'national' },
  { name: 'Natal', date: new Date(2025, 11, 25), type: 'national' },
];

// Função para verificar se uma data é feriado
export const isHoliday = (date: Date): Holiday | null => {
  const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  
  return nationalHolidays.find((holiday) => {
    const holidayStr = `${holiday.date.getFullYear()}-${holiday.date.getMonth()}-${holiday.date.getDate()}`;
    return dateStr === holidayStr;
  }) || null;
};

// Função para obter todos os feriados em um intervalo
export const getHolidaysInRange = (startDate: Date, endDate: Date): Holiday[] => {
  return nationalHolidays.filter((holiday) => {
    return holiday.date >= startDate && holiday.date <= endDate;
  });
};

