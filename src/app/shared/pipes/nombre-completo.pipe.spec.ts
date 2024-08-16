import { NombreCompletoPipe } from './nombre-completo.pipe';

describe('prueba sobre el pipe: NombreCompletoPipe', () => {
  it('crea una instancia', () => {
    const pipe = new NombreCompletoPipe();
    expect(pipe).toBeTruthy();
  });
});
