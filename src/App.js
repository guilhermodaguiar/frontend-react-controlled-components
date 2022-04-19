import React from 'react';
import {useForm} from "react-hook-form";
import './App.css';


function App() {
    const { handleSubmit, formState: { errors }, register, watch } = useForm();

    function onFormSubmit(data) {
        console.log(data);
    }
    const selectedReferrer = watch('found-through');

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <fieldset>
                <legend>Gegevens</legend>

                <label htmlFor="details-name">
                    Naam:
                    <input
                        type="text"
                        id="details-name"
                        {...register("name", {
                            required: "Naam mag niet leeg zijn",
                            validate: {
                                value: (value) => value.includes('@'),
                                message: "Naam mag geen @ bevatten"
                            },
                        })}
                    />
                </label>
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="details-age">
                    Leeftijd:
                    <input
                        type="number"
                        id="details-age"
                        {...register("age", {
                            max: {
                                value: 90,
                                message: "U mag maximaal 90 jaar oud zijn"
                            }
                        })}
                    />
                </label>
                {errors.age && <p>{errors.age.message}</p>}
            </fieldset>

            <fieldset>
                <legend>Jouw review</legend>

                <label htmlFor="recipe-comments">
                    Opmerkingen:
                    <textarea
                        {...register("comments", {required: "Opmerking mag niet leeg zijn",
                            maxLength: {
                                value: 50,
                                message: "Er mogen maximaal 50 karakters gebruikt worden",
                            },
                        })}
                        id="recipe-comments"
                        rows="4"
                        cols="40"
                        placeholder="Wat vond je van het recept?"
                    >
          </textarea>
                </label>
                {errors.comments && <p>{errors.comments.message}</p>}

                <label htmlFor="recipe-newsletter">
                    <input
                        type="checkbox"
                        {...register("newsletter")}
                    />
                    Ik schrijf me in voor de nieuwsbrief
                </label>

                <label htmlFor="referrer">
                    Hoe heb je on gevonden
                    <select id="referrer" {...register("found-through")} >
                        <option value="google">Google</option>
                        <option value="friend">Vriend</option>
                        <option value="advertisement">Advertentie</option>
                        <option value="other">Anders</option>
                    </select>
                    {selectedReferrer === "other" &&
                    <input
                        type="text"
                        {...register("found-through-anders")}
                    />}
                </label>

                <button type="submit">
                    Versturen
                </button>
            </fieldset>
        </form>
    )
}
export default App;
