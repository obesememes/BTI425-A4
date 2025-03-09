import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AdvancedSearch() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const submitForm = (data) => {
        let queryString = `searchBy=true`;

        if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
        if (data.medium) queryString += `&medium=${data.medium}`;
        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${data.q}`;

        router.push(`/artwork?${queryString}`);
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter search term"
                            {...register('q', { required: true })}
                            className={errors.q ? 'is-invalid' : ''}
                        />
                        {errors.q && <span className="text-danger">Search query is required</span>}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter location" {...register('geoLocation')} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control type="text" placeholder="Enter medium" {...register('medium')} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Highlighted</Form.Label>
                        <Form.Select {...register('isHighlight')}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Currently On View</Form.Label>
                        <Form.Select {...register('isOnView')}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Button type="submit" variant="dark">Search</Button>
        </Form>
    );
}