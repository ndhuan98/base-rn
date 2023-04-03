import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

class PostServices {
  getText = (html: string) => {
    let subtitle = html?.replace(/<[^>]+>/g, '');

    subtitle = subtitle?.toString().substring(0, 60);
    return `${subtitle}...`;
  };

  getImage = (content: string) => {
    const sources = content?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)?.map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
    if (sources?.length) {
      return sources[0];
    } else {
      return false;
    }
  };

  removeAccents = (str: string) => {
    return str
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(value);
  };

  formatPointUser(x: number) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  removeDuplicates = (originalArray: any, prop: string) => {
    let newArray = [];
    let lookupObject: any = {};

    for (let i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (let i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  };

  subStringByLength(input: string, length: number) {
    return input?.length > length ? input?.substring(0, length) + '...' : input;
  }

  roundNumber(input: number, fractionDigits: number = 2) {
    return (Math.round(input * 100) / 100).toFixed(fractionDigits).replace('.00', '');
  }
}
export const postServices = new PostServices();
