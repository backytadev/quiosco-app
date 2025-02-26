import Heading from "@/components/ui/Heading";
import ProductForm from "@/components/products/ProductForm";
import AddProductForm from "@/components/products/AddProductForm";

export default function CreateProductPage() {
  return (
    <>
      <div className="mt-1 md:mt-5 lg:mt-10">
        <Heading>Nuevo Producto</Heading>
      </div>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
