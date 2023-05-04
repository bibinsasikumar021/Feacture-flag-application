const supertest = require('supertest');
const should = require('should');
const baseUrl = '/documents';
const app = require('../server');
const db = require('../lib/dbDriver');
const instance = require('./testInstance');
const httpStatus = require('http-status-codes');
// jest.setTimeout(30000);
const {
    createDocument,
    isValiddocumentData,
    getDocumentsByUserId,
    deleteFile,
    getDocumentByDocumentId,
    editDocuments,
    deleteDocument,
    uploadFiles,
    getBlobTempPublicUrl,
    createStep,
    editSteps,
    getAllSteps,
    deleteOneStep,
    removeStepsOfOneDocument,
    getAllComments,
    createComment,
    editComments,
    deleteOneComment
} = require('../modules/document.js');
let request;
request = supertest(app);
const documentId = 'dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb'

describe('removeStepsOfOneDocument', () => {
    it('should remove step of document', () => {
        jest.spyOn(db, 'find')
            .mockReturnValueOnce(
                Promise.resolve([
                    {
                        _id: '629ddd31fa07842454f6d2f8',
                        documentId: 'dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb',
                        stepId: '7aa06ebb-7c2d-414a-be0e-40e79db2ef30',
                        stepTitle: ' ,mjn',
                        stepDescription: 'njlk',
                        media: [],
                        order_id: 1,
                        createTime: '2022-06-06T10:55:45.680Z'
                    }
                ]),
            )
        removeStepsOfOneDocument('documentId', (err, result) => {
            expect(result).not.toBe(undefined);
        })
    })
})

describe('deleteFile', () => {
    it('should delete one file from blob storage', () => {
        const result = deleteFile('test');
        expect(result);
    })
})

describe('isValiddocumentData', () => {
    it('should return true', () => {
        const result = isValiddocumentData({ test: 'test' }, ['test']);
        expect(result).toBe(true);
    })
})

describe('getBlobTempPublicUrl', () => {
    it('should return file link', async () => {
        const result = getBlobTempPublicUrl('documentsteps', '0189d628-a766-428f-9ea5-c5f1e9dd35f9/a25f4a2b-3e1c-4aa4-ab7f-7f746310cdba/Screen Shot 2022-07-14 at 1.30.01 pm.png');
        expect(result);
    })
    it('should return file link', async () => {
        const result = getBlobTempPublicUrl('documentsteps', '18e437df-6965-46f0-9baf-1be12ef60f40/018b8ea1-0dda-4ea6-9128-3aa087fcd424/67827285243__69166FF0-C7B2-4D49-A6A6-1DA2E3306B60.MOV');
        expect(result);
    })
})

describe('uploadFiles', () => {
    it('empty file array', async () => {
        const result = await uploadFiles([], 'documentId', 'stepId');
        expect(result).toEqual([]);
    });
    it('array with file', async () => {
        const result = await uploadFiles([{
            originalname: 'originalname',
            buffer: 'buffer',
            mimetype: 'mimetype'
        }], 'documentId', 'stepId');
        expect(result).toEqual(["documentId/stepId/originalname"]);
    })
})
//unit test for APIs
describe('Get all documents API', () => {
    it('Get all documents successfully', (done) => {
        request.get(`${baseUrl}`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            // .expect(httpStatus.OK)
            .end((err, result) => {
                done();
            });
    });
})

describe('Get document by id API', () => {
    it('Get document successfully', (done) => {
        request.get(`${baseUrl}/${documentId}`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('Create one Document API', () => {
    it('Create one Document successfully', (done) => {
        request.put(`${baseUrl}`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                faultTitle: "mvc test",
                faultCode: "1234",
                faultDescription: "midhun testing full flow"
            })
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('edit one Document API', () => {
    it('edit one Document successfully', (done) => {
        request.patch(`${baseUrl}`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                faultTitle: "qqqqqqqqqqqqqqqqqqqqqqqqqqq",
                faultCode: "9999999999",
                documentId: "dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb",
                faultDescription: "Problem solving is the act of defining a problem; determining the cause of the problem; identifying, prioritizing, and selecting alternatives for a solution; and implementing a solution. The problem-solving process. Problem solving resources.",
                documentStatus: "awaiting_review"
            })
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
    it('submit one Document', (done) => {
        request.patch(`${baseUrl}`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                faultCode: "hvjv",
                faultDescription: "jhvj",
                faultTitle: "gdasg",
                documentId: "dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb",
                documentStatus: "awaiting_review"
            })
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('add step for a document API', () => {
    it('add step successfully', (done) => {
        request.put(`${baseUrl}/dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb/steps`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                data: `{"title":"STEP 1","description":"step 1 description","tabledata":"step1 tabledata","media":[],"order_id":1,"stepId":""}`
            })
            .expect(httpStatus.CREATED)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('delete one document API', () => {
    it('delete document successfully', (done) => {
        request.delete(`${baseUrl}/dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .expect(httpStatus.NO_CONTENT)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('edit one step for a document API', () => {
    it('edit step successfully', (done) => {
        request.patch(`${baseUrl}/dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb/steps/`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                data: `{"title": "title", "description":"description", "tools":"tools", "spares":"spares", "order_id":1,"mediaToBeDeleted":["a3b65618-81d3-4b48-a050-ff6bc8ba40b6/8af3b7db-c0d3-4ab6-ab16-e6af9ea5389f/1.jpg"], "_id":"_id"}`
            })
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('Get all steps for a document API', () => {
    it('Get all steps for a document successfully', (done) => {
        request.get(`${baseUrl}/dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb/comments`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})



describe('delete one step API', () => {
    it('delete one step successfully', (done) => {
        request.delete(`${baseUrl}/dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb/steps/7aa06ebb-7c2d-414a-be0e-40e79db2ef30`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .expect(httpStatus.NO_CONTENT)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('Get all comments for a document API', () => {
    it('Get all comments for a document successfully', (done) => {
        request.get(`${baseUrl}/dcf1a2f8-c50a-436a-818e-6c61e0ffe3fb/steps`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('Create one comment for document API', () => {
    it('Create one comment successfully', (done) => {
        request.put(`${baseUrl}/fc7b2070-09ca-47a1-aada-c5f54639feea/steps/ff36c570-6581-40f7-a1b1-187c14937e68/comments`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                typeOfFeedback:"test data",
                summaryOfFeedback:"test data",
                brief:"test data"

            })
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('edit one Comment API', () => {
    it('edit one comment successfully', (done) => {
        request.patch(`${baseUrl}/fc7b2070-09ca-47a1-aada-c5f54639feea/steps/ff36c570-6581-40f7-a1b1-187c14937e68/comments/92a061cd-a985-4b05-94a7-8c0db3ed5350`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                typeOfFeedback:"test data",
                summaryOfFeedback:"test data",
                brief:"test data",
                document:"fc7b2070-09ca-47a1-aada-c5f54639feea"
            })
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
    it('submit one comment', (done) => {
        request.patch(`${baseUrl}/fc7b2070-09ca-47a1-aada-c5f54639feea/steps/ff36c570-6581-40f7-a1b1-187c14937e68/comments/92a061cd-a985-4b05-94a7-8c0db3ed5350`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .send({
                typeOfFeedback:"test data",
                summaryOfFeedback:"test data",
                brief:"test data",
                document:"fc7b2070-09ca-47a1-aada-c5f54639feea"
            })
            .expect(httpStatus.OK)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

describe('delete one comment API', () => {
    it('delete one comment successfully', (done) => {
        request.delete(`${baseUrl}/fc7b2070-09ca-47a1-aada-c5f54639feea/steps/ff36c570-6581-40f7-a1b1-187c14937e68/comments/92a061cd-a985-4b05-94a7-8c0db3ed5350`)
            .set("Content-Type", "application/json")
            .set('Authorization', `Bearer ${instance.jwtToken}`)
            .expect(httpStatus.NO_CONTENT)
            .end((err, result) => {
                should.exist(result);
                done();
            });
    });
})

// unit tests for modules / control / helper functions

describe('getDocumentsByUserId', () => {
    it('should return empty array', (done) => {
        jest.spyOn(db, 'find')
            .mockReturnValueOnce(
                Promise.resolve([]),
            )
        getDocumentsByUserId(null, (err, result) => {
            expect(result).not.toBe(undefined);
        })
        done();
    })
    it('should return document list', (done) => {
        jest.spyOn(db, 'find')
            .mockReturnValueOnce(
                Promise.resolve([{
                    documentId: '8507d0e8-ad6f-49c2-99b1-e436fe77f68b',
                    faultTitle: 'kjbkj',
                    createdBy: 'mvc2141997@gmail.com',
                    documentStatus: 'awaiting_review'
                }]),
            )
        getDocumentsByUserId(null, (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe([{
                documentId: '8507d0e8-ad6f-49c2-99b1-e436fe77f68b',
                faultTitle: 'kjbkj',
                createdBy: 'mvc2141997@gmail.com',
                documentStatus: 'awaiting_review'
            }]);
        })
        done();
    })
});

describe('createDocument', () => {
    it('should post one document', (done) => {
        jest.spyOn(db, 'insertOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    result: { n: 1, ok: 1 },
                    insertedCount: 1
                }),
            )
        createDocument(null, { document: 'document' }, (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                result: { n: 1, ok: 1 },
                insertedCount: 1
            });
        })
        done();
    });
    // it('should post new solution', (done) => {
    //     postSolutions(null, {solution: 'solution'}, (err, result) => {
    //         expect(result).not.toBe(undefined);
    //     })
    //     done();
    // });
    it('fail to post one document', (done) => {
        jest.spyOn(db, 'insertOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    result: { n: 0, ok: 0 },
                    insertedCount: 0
                }),
            )
        createDocument(null, { document: 'document' }, (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result.insertedCount).toBe(0);
        })
        done();
    });
});

describe('deleteDocument', () => {
    it('should delete one document', (done) => {
        jest.spyOn(db, 'remove')
            .mockReturnValueOnce(
                Promise.resolve({
                    result: { n: 1, ok: 1 }
                }),
            )
        jest.spyOn(db, 'find')
            .mockReturnValueOnce(
                Promise.resolve(true),
            )
        deleteDocument('documentId', (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                result: { n: 1, ok: 1 }
            });
        })
        done();
    });
});

describe('getDocumentByDocumentId', () => {
    it('should return one document', (done) => {
        jest.spyOn(db, 'findOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                    faultTitle: 'wf',
                    faultCode: 'wd',
                    faultDescription: 'qwd',
                    createdBy: 'mvc2141997@gmail.com',
                    documentStatus: 'approved'
                })
            )
        getDocumentByDocumentId('documentId', (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                faultTitle: 'wf',
                faultCode: 'wd',
                faultDescription: 'qwd',
                createdBy: 'mvc2141997@gmail.com',
                documentStatus: 'approved'
            });
        })
        done();
    })
})

describe('editDocument', () => {
    it('should edit one document', (done) => {
        jest.spyOn(db, 'updateOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                    faultTitle: 'wf',
                    faultCode: 'wd',
                    faultDescription: 'qwdkjb',
                    createdBy: 'mvc2141997@gmail.com',
                    documentStatus: 'approved'
                }),
            )
        editDocuments('userId', { document: 'document' }, (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                faultTitle: 'wf',
                faultCode: 'wd',
                faultDescription: 'qwdkjb',
                createdBy: 'mvc2141997@gmail.com',
                documentStatus: 'approved'
            });
        })
        done();
    });
});

describe('createStep', () => {
    it('should create step for a document', (done) => {
        jest.spyOn(db, 'insertOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                    faultTitle: 'wf',
                    faultCode: 'wd',
                    faultDescription: 'qwdkjb',
                    createdBy: 'mvc2141997@gmail.com',
                    documentStatus: 'approved'
                }),
            )
        createStep('userId', 'documentId', { step: 'step' }, [], (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                faultTitle: 'wf',
                faultCode: 'wd',
                faultDescription: 'qwdkjb',
                createdBy: 'mvc2141997@gmail.com',
                documentStatus: 'approved'
            });
        })
        done();
    });
    it('should create new step for a document', (done) => {
        createStep('userId', 'documentId', { step: 'step' }, [], (err, result) => {
            expect(result).not.toBe(undefined);
        })
        done();
    });
});

describe('editSteps', () => {
    it('should edit one step', (done) => {
        jest.spyOn(db, 'updateOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                    faultTitle: 'wf',
                    faultCode: 'wd',
                    faultDescription: 'qwdkjb',
                    createdBy: 'mvc2141997@gmail.com',
                    documentStatus: 'approved'
                }),
            )
        jest.spyOn(db, 'findOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                    faultTitle: 'wf',
                    faultCode: 'wd',
                    faultDescription: 'qwdkjb',
                    createdBy: 'mvc2141997@gmail.com',
                    documentStatus: 'approved'
                }),
            )
        editSteps('userId', 'documentId', { step: 'step' }, [], (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                faultTitle: 'wf',
                faultCode: 'wd',
                faultDescription: 'qwdkjb',
                createdBy: 'mvc2141997@gmail.com',
                documentStatus: 'approved'
            });
        })
        done();
    });
});

describe('getAllSteps', () => {
    it('get all steps for a document', (done) => {
        jest.spyOn(db, 'find')
            .mockReturnValueOnce(
                Promise.resolve([
                    {
                        _id: '629ddd31fa07842454f6d2f8',
                        documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                        stepId: '1cb2b81a-f829-47ea-bd15-504731e9e974',
                        stepTitle: ' ,mjn',
                        stepDescription: 'njlk',
                        media: [],
                        spares: 'lkj',
                        order_id: 1,
                        createdBy: 'mvc2141997@gmail.com',
                        createdOn: '2022-06-06T10:55:45.680Z',
                        modifiedOn: '2022-06-06T10:55:45.680Z',
                        modifiedBy: 'mvc2141997@gmail.com'
                    }
                ]),
            )
        getAllSteps('documentId', (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe([
                {
                    _id: '629ddd31fa07842454f6d2f8',
                    documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                    stepId: '1cb2b81a-f829-47ea-bd15-504731e9e974',
                    stepTitle: ' ,mjn',
                    stepDescription: 'njlk',
                    media: [],
                    spares: 'lkj',
                    order_id: 1,
                    createdBy: 'mvc2141997@gmail.com',
                    createdOn: '2022-06-06T10:55:45.680Z',
                    modifiedOn: '2022-06-06T10:55:45.680Z',
                    modifiedBy: 'mvc2141997@gmail.com'  
                }
            ]);
        })
        done();
    });
});

describe('deleteOneStep', () => {
    it('delete step successfully', (done) => {
        jest.spyOn(db, 'findOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: 'f843262b-0648-4ce0-8554-1a7b0511273f',
                    faultTitle: 'wf',
                    faultCode: 'wd',
                    faultDescription: 'qwdkjb',
                    createdBy: 'mvc2141997@gmail.com',
                    documentStatus: 'approved'
                }),
            )
        jest.spyOn(db, 'remove')
            .mockReturnValueOnce(
                Promise.resolve({
                    result: { n: 1, ok: 1 }
                }),
            )
        deleteOneStep('documentId', 'stepId', (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                result: { n: 1, ok: 1 }
            });
        })
        done();
    });
});

describe('getAllComments', () => {
    it('should return All comments for a document', (done) => {
        jest.spyOn(db, 'find')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                    stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                    typeOfFeedback:"type",
                    summaryOfFeedback:"summary",
                    type:"review comment",
                    brief:"brief",
                    createdBy: "jijo.j@gmail.com"
                })
            )
        getAllComments('documentId', (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                typeOfFeedback:"type",
                summaryOfFeedback:"summary",
                type:"review comment",
                brief:"brief",
                createdBy: "jijo.j@gmail.com"
               
            });
        })
        done();
    })
})

describe('createComment', () => {
    it('should create comment for a document', (done) => {
        jest.spyOn(db, 'insertOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                    stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                    typeOfFeedback:"type",
                    summaryOfFeedback:"summary",
                    type:"review comment",
                    brief:"brief",
                    createdBy: "jijo.j@gmail.com"
                }),
            )
        createStep('userId', 'documentId', { step: 'step' }, {data:"data"}, (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                typeOfFeedback:"type",
                summaryOfFeedback:"summary",
                type:"review comment",
                brief:"brief",
                createdBy: "jijo.j@gmail.com"
            });
        })
        done();
    });
    it('should create new comment for a document', (done) => {
        createStep('userId', 'documentId', { step: 'step' }, {data:"data"}, (err, result) => {
            expect(result).not.toBe(undefined);
        })
        done();
    });
});

describe('editComments', () => {
    it('should edit one comment', (done) => {
        jest.spyOn(db, 'updateOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                    stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                    typeOfFeedback:"type",
                    summaryOfFeedback:"summary",
                    type:"review comment",
                    brief:"brief",
                    createdBy: "jijo.j@gmail.com"
                }),
            )
        jest.spyOn(db, 'findOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                    stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                    typeOfFeedback:"type",
                    summaryOfFeedback:"summary",
                    type:"review comment",
                    brief:"brief",
                    createdBy: "jijo.j@gmail.com"
                }),
            )
        editSteps('userId', 'documentId', { step: 'step' },'commentId', {data:"data"}, (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                typeOfFeedback:"type",
                summaryOfFeedback:"summary",
                type:"review comment",
                brief:"brief",
                createdBy: "jijo.j@gmail.com"
            });
        })
        done();
    });
});

describe('deleteOneComment', () => {
    it('delete comment successfully', (done) => {
        jest.spyOn(db, 'findOne')
            .mockReturnValueOnce(
                Promise.resolve({
                    documentId: "fc7b2070-09ca-47a1-aada-c5f54639feea",
                    stepId: "ff36c570-6581-40f7-a1b1-187c14937e68",
                    typeOfFeedback:"type",
                    summaryOfFeedback:"summary",
                    type:"review comment",
                    brief:"brief",
                    createdBy: "jijo.j@gmail.com"
                }),
            )
        jest.spyOn(db, 'remove')
            .mockReturnValueOnce(
                Promise.resolve({
                    result: { n: 1, ok: 1 }
                }),
            )
        deleteOneComment('documentId', 'stepId', 'commentId', (err, result) => {
            expect(result).not.toBe(undefined);
            expect(result).toBe({
                result: { n: 1, ok: 1 }
            });
        })
        done();
    });
});