const mockIntersectionObserver = jest.fn().mockImplementation(() => ({
  root: null,
  rootMargin: "",
  thresholds: [],
  disconnect: jest.fn(),
  observe: jest.fn(),
  takeRecords: jest.fn(),
  unobserve: jest.fn(),
}));

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});
Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});
