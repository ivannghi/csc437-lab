import { useId, useState, useActionState } from "react";

export function ImageUploadForm(props) {
    const id = useId()
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null); 
    
    function readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    async function handleFileSelected(e) {
        const inputElement = e.target;
        const fileObj = inputElement.files[0];
        const url = await readAsDataURL(fileObj);
        setImage(url);
        setFile(fileObj);
        
    }

    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const name = formData.get("name");
            console.log(`name: ${name} image: ${file}`);
        
            if (!file) {
                return {
                    type: "error",
                    message: "Please select an image to upload.",
                    color: "red",
                };
            }
            if (!formData.get("name")) {
                return {
                    type: "error",
                    message: "Please provide an image title.",
                    color: "red",
                };
            }

            formData.set("image", file);  

            // console.log("beforeonsubmit");
            const submitResult = await props.onSubmit(formData);

            return submitResult;
        },
        null
      );

    return (
        <form action={submitAction}>
            <div>
                <label htmlFor={id}>Choose image to upload: </label>
                <input
                    onChange={handleFileSelected}
                    name="image"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    id={id}
                />
            </div>
            <div>
                <label>
                    <span>Image title: </span>
                    <input name="name" />
                </label>
            </div>

            <div> {/* Preview img element */}
                <img style={{maxWidth: "20em"}} src={image} alt="" />
            </div>

            <button>Confirm upload</button>

            {result && <p style={{ color: result.color }}>{result.message}</p>}
        </form>
    );
}