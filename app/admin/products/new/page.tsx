import Heading from "@/components/ui/Heading";
import ProductForm from "@/components/products/ProductForm";
import AddProductForm from "@/components/products/AddProductForm";

export default function CreateProductPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
