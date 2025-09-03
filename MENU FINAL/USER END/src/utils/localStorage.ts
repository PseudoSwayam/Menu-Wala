export const storage = {
  setTableNumber: (tableNumber: number) => {
    localStorage.setItem('restaurant-table-number', tableNumber.toString());
  },
  
  getTableNumber: (): number | null => {
    const tableNumber = localStorage.getItem('restaurant-table-number');
    return tableNumber ? parseInt(tableNumber, 10) : null;
  },
  
  clearTableNumber: () => {
    localStorage.removeItem('restaurant-table-number');
  },
  
  setCurrentOrderId: (orderId: string) => {
    localStorage.setItem('restaurant-current-order', orderId);
  },
  
  getCurrentOrderId: (): string | null => {
    return localStorage.getItem('restaurant-current-order');
  },
  
  clearCurrentOrderId: () => {
    localStorage.removeItem('restaurant-current-order');
  },
  
  clearAll: () => {
    localStorage.removeItem('restaurant-table-number');
    localStorage.removeItem('restaurant-current-order');
    localStorage.removeItem('restaurant-cart');
  }
};