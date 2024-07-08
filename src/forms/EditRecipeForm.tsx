import {RecipeResponse, useUpdateRecipeMutation} from "../services/recipe.api.ts";
import {Alert, Button, Form} from "react-bootstrap";
import RenderError from "../components/RenderError.tsx";
import React, {useEffect, useState} from "react";
import {useSearchCookbooksQuery} from "../services/cookbook.api.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

interface EditRecipeFormProps {
    recipe: RecipeResponse;
    onClose: () => void;
}

interface CookbookOption {
    value: number;
    label: string;
}

const  EditRecipeForm: React.FC<EditRecipeFormProps> = ({ recipe, onClose }) => {
    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [instructions, setInstructions] = useState(recipe.instructions);
    const [url, setUrl] = useState(recipe.url);
    const [cookbookId, setCookbookId] = useState<number | undefined>(recipe.cookbook?.id);
    const [page, setPage] = useState(recipe.page?.toString() || '');
    const [imageFileName, setImageFileName] = useState(recipe.imageFileName || '');
    const [isPublic, setIsPublic] = useState(recipe.isPublic);
    const [validated, setValidated] = useState(false);
    const [cookbookOptions, setCookbookOptions] = useState([] as CookbookOption[]);

    const [updateRecipe, { isLoading, isSuccess, isError, error }] = useUpdateRecipeMutation();

    const { data: cookbooks, isSuccess: cookbookSuccess} = useSearchCookbooksQuery({ name: '', page: 0, size: 10, sort: 'name,asc' });

    const currentGroupId: number | undefined = useSelector((state:RootState) => state.group.currentGroupId);

    useEffect(() => {
        if (cookbookSuccess) {
            setCookbookOptions(cookbooks.content.map((cookbook) => ({ value: cookbook.id, label: cookbook.name })));
        }
    }, [cookbooks, cookbookSuccess]);

    const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        let pageNumber;
        try {
            pageNumber = page ? parseInt(page) : undefined;
        } catch (e) {
            pageNumber = undefined;
        }
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            await updateRecipe({id: recipe.id, recipe: {name, description, instructions, url, cookbookId, page: pageNumber, imageFileName: imageFileName, isPublic, groupId: currentGroupId}});
            onClose();
        }
        setValidated(true);
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {

            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/images/upload`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setImageFileName(data.imageFileName);
                    console.log(`Image uploaded: ${data.imageFileName}`)
                } else {
                    console.error('Error uploading image:');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    }

  return (
      <Form onSubmit={submitHandler} noValidate validated={validated}>
          <h1>Edit Recipe</h1>
          {isError && <Alert title="Error" variant="warning"><RenderError error={error}/></Alert>}

              <Form.Group className='my-2' controlId='name'>
                  <Form.Label>Recipe Name *</Form.Label>
                  <Form.Control
                      required
                      type='text'
                      placeholder='Enter recipe name'
                      value={name}
                      disabled={isLoading}
                      onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='isPublic'>
                  <Form.Check
                      type="checkbox"
                      label="Public"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      disabled={isLoading}
                  />
              </Form.Group>

              <Form.Group className='my-2' controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      as='textarea'
                      rows={3}
                      placeholder='Enter description'
                      value={description}
                      disabled={isLoading}
                      onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
              </Form.Group>



              <Form.Group className='my-2' controlId='url'>
                  <Form.Label>Recipe URL</Form.Label>
                  <Form.Control
                      type='url'
                      placeholder='Enter URL'
                      value={url}
                      disabled={isLoading}
                      onChange={(e) => setUrl(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='cookbook'>
                  <Form.Label>Cookbook</Form.Label>
                  <Form.Select
                      value={cookbookId}
                      disabled={isLoading}
                      onChange={(e) => setCookbookId(parseInt(e.target.value))}
                  >
                      <option value=''>Select a cookbook</option>
                      {cookbookOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                  </Form.Select>
              </Form.Group>

              <Form.Group className='my-2' controlId='page'>
                  <Form.Label>Page</Form.Label>
                  <Form.Control
                      type='number'
                      placeholder='Enter page number'
                      value={page}
                      disabled={isLoading}
                      onChange={(e) => setPage(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='instructions'>
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                      as='textarea'
                      rows={3}
                      placeholder='Enter instructions'
                      value={instructions}
                      disabled={isLoading}
                      onChange={(e) => setInstructions(e.target.value)}
                  ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='image'>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                      type='file'
                      onChange={handleImageUpload}
                      disabled={isLoading}
                  ></Form.Control>
                  {imageFileName && (
                      <div className='mt-3'>
                          <img src={`${import.meta.env.VITE_API_BASE_URL}/api/images/${imageFileName}`} alt="Uploaded" style={{ maxWidth: '100%' }} />
                      </div>
                  )}
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
                  Update Recipe
              </Button>
              <Button variant="secondary" className='mt-3 ml-3' onClick={onClose}>
                  Cancel
              </Button>
              {isSuccess && <p>Recipe added successfully!</p>}
              {isLoading && <p>Loading...</p>}
          </Form>






  )

}

export default EditRecipeForm;