import eventBus from '@/eventBus';

export default function goToPage(pageName, PageParams) {
  eventBus.$emit('goToPage', pageName, PageParams);
}
