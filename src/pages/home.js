import React from 'react';
import Card from 'react-bootstrap/Card';
const home = () => {
    return (
        <>
            <div className='d-flex justify-content-evenly'>
                <Card className='mt-5' style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Blogs</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Create AIblog</Card.Subtitle>
                        <Card.Text>
                            Create awesome blogs with AI
                        </Card.Text>
                        <Card.Link href="/blog">Create</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default home
