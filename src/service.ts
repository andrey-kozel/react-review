class ItemsService {

  itemsCount = 100;

  async getItems(filter: string, size?: number, page?: number): Promise<any> {
    const actualSize = size || 20;
    const actualPage = page || 1;
    const remainingItems = this.itemsCount - (actualSize * (actualPage - 1));
    const itemsToReturn = remainingItems > actualSize ? actualSize : remainingItems;

    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        return Array.from({ length: itemsToReturn }, (_, index) => ({
          id: this.itemsCount - remainingItems + index,
          title: `Item ${index}`
        }))
          .filter(({ title }) => title.indexOf(filter) > -1);
      });
  }

}

export default new ItemsService();
