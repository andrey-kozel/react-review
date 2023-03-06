class ItemsService {

  itemsCount = 500;

  async getItems(filter: string, size?: number, page?: number): Promise<any> {
    const actualSize = size || 100;
    const actualPage = page || 1;
    const remainingItems = this.itemsCount - (actualSize * (actualPage - 1));
    const itemsToReturn = remainingItems > actualSize ? actualSize : remainingItems;

    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        return Array.from({ length: itemsToReturn }, (_, index) => ({
          id: this.itemsCount - remainingItems + index,
          title: `Item ${index}`,
          price: index * 10
        }))
          .filter(({ title }) => title.indexOf(filter) > -1);
      });
  }

  async getUserInfo(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      name: 'User',
      age: 25
    }
  }

}

export default new ItemsService();
