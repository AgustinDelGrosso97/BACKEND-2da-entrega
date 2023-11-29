class ManejadorDeProductos {
    constructor() {
      this.productos = [];
    }
    generarIdUnico() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    agregarProducto(titulo, descripcion, precio, miniatura, codigo, stock) {
      const idProducto = this.generarIdUnico(); 
      const producto = { id: idProducto, titulo, descripcion, precio, miniatura, codigo, stock };
      this.productos.push(producto);
      return producto;
    }
    obtenerProducto(filtro) {
      for (const producto of this.productos) {
        let coincide = true;
        for (const clave in filtro) {
          if (producto[clave] !== filtro[clave]) {
            coincide = false;
            break;
          }
        }
        if (coincide) {
          return producto;
        }
      }
      throw new Error("Producto no encontrado");
    }
    actualizarProducto(idProducto, nuevosDatos) {
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].id === idProducto) {
          this.productos[i] = { ...this.productos[i], ...nuevosDatos };
          return this.productos[i];
        }
      }
      throw new Error("Producto no encontrado");
    }
    eliminarProducto(idProducto) {
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].id === idProducto) {
          const productoEliminado = this.productos.splice(i, 1);
          return true;
        }
      }
      throw new Error("Producto no encontrado");
    }
  }
  const manejadorDeProductos = new ManejadorDeProductos();
  const nuevoProducto = manejadorDeProductos.agregarProducto(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  const productos = manejadorDeProductos.productos;
  console.log("Productos:", productos);
  try {
    const productoPorId = manejadorDeProductos.obtenerProducto({ id: nuevoProducto.id });
    console.log("Producto por ID:", productoPorId);
  } catch (error) {
    console.error("Error:", error.message);
  }
  try {
    const productoActualizado = manejadorDeProductos.actualizarProducto(nuevoProducto.id, { precio: 250 });
    console.log("Producto actualizado:", productoActualizado);
  } catch (error) {
    console.error("Error:", error.message);
  }
  try {
    const resultadoEliminacion = manejadorDeProductos.eliminarProducto(nuevoProducto.id);
    console.log("Producto eliminado:", resultadoEliminacion);
  } catch (error) {
    console.error("Error:", error.message);
  }