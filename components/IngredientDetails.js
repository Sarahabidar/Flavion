import { useRouter } from "next/router";
import { useState } from "react";
import { flavorColors } from "@/utils";
import {
  Container,
  ImageWrapper,
  StyledImage,
  StyledContent,
  Name,
  Flavor,
  BackLink,
  CardFooter,
  DetailsCard,
  DeleteButton,
  ConfirmDialog,
  Button,
  EditButton,
} from "@/_styles";

const IngredientDetails = ({ ingredients, deleteIngredient }) => {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!ingredient) {
    return <p>Loading...</p>;
  }

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteIngredient(id);
    router.push("/");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleEdit = () => {
    router.push(`/ingredient/${id}/edit`);
  };

  return (
    <>
      <BackLink href="/">← Back</BackLink>
      <Container>
        <DetailsCard>
          <ImageWrapper>
            <StyledImage
              src={ingredient.imgUrl}
              alt={ingredient.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </ImageWrapper>
          <StyledContent>
            <Name>{ingredient.name}</Name>
            <br />
          </StyledContent>
          <CardFooter>
            <Flavor $color={flavorColors[ingredient.flavor]}>
              #{ingredient.flavor}
            </Flavor>
          </CardFooter>
        </DetailsCard>
        <EditButton onClick={handleEdit}>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </Container>
      {showConfirm && (
        <ConfirmDialog>
          <p>Are you sure you want to delete this ingredient?</p>
          <Button type="button" onClick={confirmDelete}>
            Yes
          </Button>
          <Button type="button" onClick={cancelDelete}>
            No
          </Button>
        </ConfirmDialog>
      )}
    </>
  );
};

export default IngredientDetails;
