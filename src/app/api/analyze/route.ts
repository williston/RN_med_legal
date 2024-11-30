import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

type FormPrompt = {
  systemMessage: string;
  functionName: string;
  functionDescription: string;
  functionParameters: Record<string, unknown>;
};

type FormPrompts = {
  [key: string]: FormPrompt;
};

const formPrompts: FormPrompts = {
  nurseForm1: {
  systemMessage: "You are a nursing data extraction assistant. Extract relevant medical information from the given text and structure it according to the NurseFormProps1 interface. Pay special attention to physical examination details for each body system. When data is not available for a field, return an empty string ('') instead of 'N/A' or any other placeholder value. Please do not include the patient's name in the response and PLEASE EXCLUDE ANY PATIENT IDENTIFIERS OR PROTECTED HEALTH INFORMATION.",
  functionName: "fill_nurse_form_1",
  functionDescription: "Fill in the nursing form with extracted medical information, ensuring detailed physical examination findings are included for each body system. Please do not include the patient's name in the response.",
  functionParameters: {
    type: "object",
    properties: {
      patientInfo: {
        type: "object",
        properties: {
          code: { type: "string",
            description: "the patient's code status, meaning do not resuscitate, do not intubate, or full code."
          },
         /*  doctors: { type: "string",
            description: "The attending physician and any other physicians involved in the patient's care."
          }, */
          /* patient: { type: "string" }, */
          allergies: { type: "string" }
        }
      },
      diagnosis: { 
        type: "string",
        description: `Provide a concise summary of the patient's history of present illness (HPI), including:
        1. Patient demographics (age, gender BUT EXCLUDE PATIENT IDENTIFIERS and PROTECTED HEALTH INFORMATION)
        2. Chief complaint or main symptoms
        3. Onset and duration of symptoms
        4. Relevant medical history
        5. Key physical findings
        6. Initial treatments given and response
        7. Any significant negatives or other relevant information
        Aim for a paragraph of 3-5 sentences that captures the essence of the patient's current medical situation.`
      },
      vitalSigns: { 
        type: 'object',
        description: "Vital signs including temperature, heart rate, blood pressure, respiratory rate, and oxygen saturation.",
        properties: {
          temperature: { type: 'string' },
          heartRate: { type: 'string' },
          bloodPressure: { type: 'string' },
          respiratoryRate: { type: 'string' },
          oxygenSaturation: { type: 'string' }
        }
      },
      labs: {
        type: "object",
        properties: {
          wbc: { type: "string", description: "white blood cell count" },
          hgb: { type: "string", description: "hemoglobin" },
          hct: { type: "string", description: "hematocrit" },
          plt: { type: "string", description: "platelet count" },
          tbil: { type: "string", description: "total bilirubin" },
          alkP: { type: "string", description: "alkaline phosphatase" },
          ast: { type: "string", description: "aspartate aminotransferase" },
          alt: { type: "string", description: "alanine aminotransferase" },
          na: { type: "string", description: "sodium" },
          k: { type: "string", description: "potassium" },
          cl: { type: "string", description: "chloride" },
          co2: { type: "string", description: "carbon dioxide" },
          bun: { type: "string", description: "blood urea nitrogen" },
          gluc: { type: "string", description: "glucose" },
          creat: { type: "string", description: "creatinine" },
          ptInr: { type: "string", description: "prothrombin time" },
          ptt: { type: "string" },
          ca: { type: "string", description: "calcium" },
          mg: { type: "string", description: "magnesium" },
          phos: { type: "string", description: "phosphorus" }
        }
      },
      history: { 
        type: "string",
        description: "All past medical conditions and relevant medical history. Include chronic conditions here, even if they are ongoing. Please do not include symptoms from the HPI. Please only list the names of the conditions, separate each condition with a comma. do not include other text. please use correct spelling and grammar."
      },
      bloodSugar: { type: "array", items: { type: "string" } },
      systemStatus: {
        type: "object",
        description: "Detailed status and physical examination findings for each body system. Provide specific, detailed information in the physicalExam field for each system. Do not include radiology findings or review of systems, or other information included in the HPI. ONLY include the physical exam findings for each system.",
        properties: {
          neurological: {
            type: "object",
            description: "Neurological system status and examination findings",
            properties: {
              status: { 
                type: "string",
                description: "Overall status of the neurological system (e.g., 'normal', 'abnormal')"
              },
              details: { 
                type: "string",
                description: "General observations about the neurological system's condition"
              },
              physicalExam: { 
                type: "object",
                description: "Specific neurological examination findings",
                properties: {
                  mentalStatus: { type: "string" },
                  cranialNerves: { type: "string" },
                  motorFunction: { type: "string" },
                  sensoryFunction: { type: "string" },
                  reflexes: { type: "string" }
                }
              }
            }
          },
          cardiovascular: {
            type: "object",
            description: "Cardiovascular system status and examination findings",
            properties: {
              status: { 
                type: "string",
                description: "Overall status of the cardiovascular system (e.g., 'stable', 'unstable')"
              },
              details: { 
                type: "string",
                description: "General observations about the cardiovascular system's condition"
              },
              physicalExam: { 
                type: "object",
                description: "Specific cardiovascular examination findings",
                properties: {
                  heartSounds: { type: "string" },
                  pulses: { type: "string" },
                  neckExam: { type: "string" },
                  edema: { type: "string" }
                }
              }
            }
          },
          respiratory: {
            type: "object",
            description: "Respiratory system status and examination findings",
            properties: {
              status: { 
                type: "string",
                description: "Overall status of the respiratory system (e.g., 'clear', 'distressed')"
              },
              details: { 
                type: "string",
                description: "General observations about the respiratory system's condition"
              },
              physicalExam: { 
                type: "object",
                description: "Specific respiratory examination findings",
                properties: {
                  breathSounds: { type: "string" },
                  respiratoryEffort: { type: "string" },
                  chestMovement: { type: "string" }
                }
              }
            }
          },
          gastrointestinalGenitourinary: {
            type: "object",
            description: "Gastrointestinal and genitourinary systems status and examination findings",
            properties: {
              status: { 
                type: "string",
                description: "Overall status of the GI/GU systems (e.g., 'normal', 'abnormal')"
              },
              details: { 
                type: "string",
                description: "General observations about the GI/GU systems' condition"
              },
              physicalExam: { 
                type: "object",
                description: "Specific GI/GU examination findings",
                properties: {
                  abdominalExam: { type: "string" },
                  bowelSounds: { type: "string" },
                  urinaryOutput: { type: "string" }
                }
              }
            }
          },
          skin: {
            type: "object",
            description: "Skin status and examination findings",
            properties: {
              status: { 
                type: "string",
                description: "Overall status of the skin (e.g., 'intact', 'compromised')"
              },
              details: { 
                type: "string",
                description: "General observations about the skin's condition"
              },
              physicalExam: { 
                type: "object",
                description: "Specific skin examination findings",
                properties: {
                  color: { type: "string" },
                  turgor: { type: "string" },
                  lesions: { type: "string" },
                  wounds: { type: "string" }
                }
              }
            }
          }
        },
        additionalProperties: false
      },
      careInfo: {
        type: "object",
        description: "Detailed information about the patient's care plan and interventions",
        properties: {
          ivFluids: {
            type: "object",
            description: "Information about intravenous fluids and lines",
            properties: {
              status: {
                type: "string",
                description: "Current status of IV access and fluids (e.g., 'running', 'saline lock')"
              },
              details: {
                type: "string",
                description: "Specific details about IV fluids, including type, rate, and any additives"
              },
              access: {
                type: "string",
                description: "Description of IV access (e.g., '20G right forearm', 'central line')"
              }
            }
          },
          dietFeeding: {
            type: "object",
            description: "Information about the patient's diet and feeding status",
            properties: {
              type: {
                type: "string",
                description: "Type of diet ordered (e.g., 'regular', 'NPO', 'clear liquids')"
              },
              restrictions: {
                type: "string",
                description: "Any dietary restrictions or special considerations"
              },
              assistanceNeeded: {
                type: "string",
                description: "Level of assistance needed for feeding, if any"
              }
            }
          },
          activity: {
            type: "object",
            description: "Information about the patient's activity level and mobility",
            properties: {
              level: {
                type: "string",
                description: "Prescribed activity level (e.g., 'bed rest', 'ambulate with assistance')"
              },
              restrictions: {
                type: "string",
                description: "Any activity restrictions or precautions"
              },
              assistiveDevices: {
                type: "string",
                description: "Any assistive devices needed for mobility"
              }
            }
          },
          vte: {
            type: "object",
            description: "Venous thromboembolism prophylaxis information",
            properties: {
              prophylaxis: {
                type: "string",
                description: "Type of VTE prophylaxis ordered (e.g., 'SCDs', 'heparin')"
              },
              contraindications: {
                type: "string",
                description: "Any contraindications to VTE prophylaxis"
              },
              notes: {
                type: "string",
                description: "Additional notes about VTE risk or management"
              }
            }
          },
          medications: {
            type: "object",
            description: "Information about the patient's medication regimen",
            properties: {
              current: {
                type: "string",
                description: "List of current medications and dosages"
              },
              prn: {
                type: "string",
                description: "List of PRN (as-needed) medications"
              },
              recentChanges: {
                type: "string",
                description: "Recent changes to medication regimen"
              },
              administrationNotes: {
                type: "string",
                description: "Special notes about medication administration"
              }
            }
          }
        },
        additionalProperties: false
      },
      notes: { 
        type: "string",
        description: "Any additional notes or comments about the patient's condition or care plan"
      },
      imaging: {
        type: "object",
        description: "Information about imaging studies and their findings",
        properties: {
          xrayUltrasound: {
            type: "object",
            description: "X-ray and ultrasound findings",
            properties: {
              findings: {
                type: "string",
                description: "All findings from X-ray or ultrasound studies, including timing and results"
              },
              notes: {
                type: "string",
                description: "Any additional notes or context about X-ray or ultrasound studies"
              }
            }
          },
          ctScan: {
            type: "object",
            description: "CT scan findings",
            properties: {
              findings: {
                type: "string",
                description: "All findings from CT studies, including timing, contrast information, and results"
              },
              notes: {
                type: "string",
                description: "Any additional notes or context about CT studies"
              }
            }
          },
          mri: {
            type: "object",
            description: "MRI findings",
            properties: {
              findings: {
                type: "string",
                description: "All findings from MRI studies, including timing, contrast information, and results"
              },
              notes: {
                type: "string",
                description: "Any additional notes or context about MRI studies"
              }
            }
          }
        }
      },
      plan: {
        type: "object",
        description: "Immediate next steps in patient care",
        properties: {
          immediateActions: {
            type: "array",
            description: "List of immediate actions to be taken",
            items: {
              type: "string"
            }
          },
          pendingTests: {
            type: "array",
            description: "List of pending tests or procedures",
            items: {
              type: "string"
            }
          },
          medicationChanges: {
            type: "string",
            description: "Immediate medication changes or adjustments"
          },
          consultations: {
            type: "array",
            description: "Consultations to be requested",
            items: {
              type: "string"
            }
          },
          monitoringInstructions: {
            type: "string",
            description: "Specific monitoring instructions for the next shift"
          }
        },
        additionalProperties: false
      },
      toDoList: {
        type: "object",
        description: "Prioritized list of tasks to be completed",
        properties: {
          highPriority: {
            type: "array",
            description: "High priority tasks that must be completed soon",
            items: {
              type: "object",
              properties: {
                task: { type: "string" },
                dueTime: { type: "string" }
              },
              required: ["task"]
            }
          },
          routine: {
            type: "array",
            description: "Routine tasks to be completed during the shift",
            items: {
              type: "string"
            }
          },
          beforeEndOfShift: {
            type: "array",
            description: "Tasks that should be completed before the end of the shift",
            items: {
              type: "string"
            }
          }
        },
        additionalProperties: false
      },
      teleDowngradeCriteria: {
        type: "object",
        properties: {
          "Stable resp./Off BiPAP/CPAP": { type: "boolean" },
          "Stable cardiac monitor rhythm w/ normalizing HR": { type: "boolean" },
          "Improving lactate": { type: "boolean" },
          "Fever trending down": { type: "boolean" },
          "K>3 or <6; Mg >1.5; Na>120": { type: "boolean" },
          "Hgb >7 & no evidence of ongoing GI Bleed": { type: "boolean" },
          "Cr at baseline or trending down": { type: "boolean" },
          "Down trending troponin": { type: "boolean" }
        }
      }
    }
  }
},
  nurseForm2: {
    systemMessage: "You are a nursing data extraction assistant. Extract relevant nursing information from the given text and structure it according to the NurseFormProps2 interface.",
    functionName: "fill_nursing_form_2",
    functionDescription: "Fill in the nursing form with extracted nursing information",
    functionParameters: {
      type: "object",
      properties: {
        rm: { type: "string",
          description: "Room number"
         },
        age: { type: "string",
          description: "Age of the patient"
         },
        gender: { type: "string" },
        admDate: { type: "string" },
        codeStatus: { type: "string",
          description: "the patient's code status, meaning do not resuscitate, do not intubate, or full code."
         },
        allergies: { type: "string" },
        diagnosisProcedures: { type: "string" },
        iv: { type: "string",
          description: "Intravenous medications"
         },
        io: { type: "string",
          description: "ins and outs"
         },
        importantHistory: { type: "string",
          description: `Provide a concise summary of the patient's current medical situation, including:
          1. Patient demographics (age, gender)
          2. Chief complaint or main symptoms
          3. Onset and duration of symptoms
          4. Relevant medical history
          5. Key physical findings
          6. Initial treatments given and response
          7. Any significant negatives or other relevant information
          Aim for a paragraph of 3-5 sentences that captures the essence of the patient's current medical situation.`
         },
        comorbidities: { type: "string",
          description: "All past medical conditions and relevant medical history. Include chronic conditions here, even if they are ongoing. Please do not include symptoms from the HPI. Please only list the names of the conditions, separate each condition with a comma. do not include other text. please use correct spelling and grammar."
         },
        fallRisk: { type: "string",
          description: "Fall risk assessment"
         },
        isolation: { type: "string",
          description: "Isolation status of the patient"
         },
        ulcers: { type: "string" },
        vitals: {
          type: "object",
          properties: {
            bp: { type: "string",
              description: "Blood pressure"
             },
            hr: { type: "string",
              description: "Heart rate"
             },
            respiratoryRate: { type: "string",
              description: "Respiratory rate"
             },
            temperature: { type: "string",
              description: "Temperature"
             },
            o2: { type: "string",
              description: "Oxygen saturation"
             }
          }
        },
        assessment: {
          type: "object",
          description: `When extracting physical exam findings, map them to the following system categories:
- Neurological
- Cardiovascular
- Respiratory
- Gastrointestinal/Genitourinary
- Skin
For each system, provide:
- status: An overall assessment (e.g., "normal", "abnormal")
- details: General observations
- physicalExam: Specific examination findings`,
          properties: {
            neuro: {
              type: "object",
              description: "Neurological system status and examination findings",
              properties: {
                status: { 
                  type: "string",
                  description: "Overall status of the neurological system (e.g., 'normal', 'abnormal')"
                },
                details: { 
                  type: "string",
                  description: "General details about the neurological system's condition"
                },
                physicalExam: { 
                  type: "string",
                  description: "Specific neurological examination findings (e.g., mental status, cranial nerves, motor/sensory function, reflexes)"
                }
              }
            },
            cv: {
              type: "object",
              description: "Cardiovascular system status and examination findings",
              properties: {
                status: { 
                  type: "string",
                  description: "Overall status of the cardiovascular system (e.g., 'stable', 'unstable')"
                },
                details: { 
                  type: "string",
                  description: "General details about the cardiovascular system's condition"
                },
                physicalExam: { 
                  type: "string",
                  description: "Specific cardiovascular examination findings (e.g., heart sounds, pulses, edema)"
                }
              }
            },
            resp: {
              type: "object",
              description: "Respiratory system status and examination findings",
              properties: {
                status: { 
                  type: "string",
                  description: "Overall status of the respiratory system (e.g., 'clear', 'distressed')"
                },
                details: { 
                  type: "string",
                  description: "General details about the respiratory system's condition"
                },
                physicalExam: { 
                  type: "string",
                  description: "Specific respiratory examination findings (e.g., breath sounds, respiratory rate and pattern, use of accessory muscles)"
                }
              }
            },
            gigu: {
              type: "object",
              description: "Gastrointestinal and genitourinary systems status and examination findings",
              properties: {
                status: { 
                  type: "string",
                  description: "Overall status of the GI/GU systems (e.g., 'normal', 'abnormal')"
                },
                details: { 
                  type: "string",
                  description: "General details about the GI/GU systems' condition"
                },
                physicalExam: { 
                  type: "string",
                  description: "Specific GI/GU examination findings (e.g., abdominal exam, bowel sounds, urinary output)"
                }
              }
            },
            musculoskeletal: { type: "string",
              description: "Musculoskeletal system status and examination findings"
             },
            psychSocial: { type: "string",
              description: "Psychosocial status and examination findings"
             },
            other: { type: "string",
              description: "Other systems status and examination findings"
             }
          }
        },
        labs: {
          type: "object",
          properties: {
            wbc: { type: "string",
              description: "White blood cell count"
             },
            hgb: { type: "string",
              description: "Hemoglobin"
             },
            hct: { type: "string",
              description: "Hematocrit"
             },
            plt: { type: "string",
              description: "Platelet count"
             },
            pt: { type: "string",
              description: "Prothrombin time"
             },
            ptt: { type: "string",
              description: "Partial thromboplastin time"
             },
            inr: { type: "string",
              description: "International normalized ratio"
             },
            na: { type: "string",
              description: "Sodium"
             },
            k: { type: "string",
              description: "Potassium"
             },
            cl: { type: "string",
              description: "Chloride"
             },
            co2: { type: "string",
              description: "Carbon dioxide"
             },
            bun: { type: "string",
              description: "Blood urea nitrogen"
             },
            gluc: { type: "string",
              description: "Glucose"
             },
            creat: { type: "string",
              description: "Creatinine"
             }
          }
        },
        diagnosticTests: { type: "string",
          description: "Diagnostic tests performed or ordered. This can include findings from xrays, ultrasounds, ct scans, mris, etc. This can also include lab results."
         },
        planOfCare: {
          type: "object",
          description: "Immediate next steps in patient care",
          properties: {
            immediateActions: {
              type: "array",
              description: "List of immediate actions to be taken",
              items: {
                type: "string"
              }
            },
            pendingTests: {
              type: "array",
              description: "List of pending tests or procedures",
              items: {
                type: "string"
              }
            },
            medicationChanges: {
              type: "string",
              description: "Immediate medication changes or adjustments"
            },
            consultations: {
              type: "array",
              description: "Consultations to be requested",
              items: {
                type: "string"
              }
            },
            monitoringInstructions: {
              type: "string",
              description: "Specific monitoring instructions for the next shift"
            }
          },
          additionalProperties: false
        }
      }
    }
  },
  nurseForm3: {
    systemMessage: "You are a nurse data extraction assistant. Extract relevant nurse information from the given text and structure it according to the NurseFormProps3 interface.",
    functionName: "fill_nurse_form_3",
    functionDescription: "Fill in the nurse form with extracted nurse information",
    functionParameters: {
      type: "object",
      properties: {
        room: { type: "string",
          description: "Room number"
         },
        name: { type: "string" },
        age: { type: "string" },
        gender: { type: "string", enum: ["M", "F"] },

        diagnosis: { type: "string",
          description: "active medical conditions only. Do not include past medical history here. Only list the names of the conditions and do not include other text and use commas between each condition. please use correct spelling and grammar.",
         },
       

        history: { type: "string",
          description: "All past medical conditions and relevant medical history. Include chronic conditions here, even if they are ongoing. Please only list the names of the conditions, separate each condition with a comma. do not include other text. please use correct spelling and grammar."
         },
        code: { type: "string",
          description: "the patient's code status, meaning do not resuscitate, do not intubate, or full code."
         },
        allergies: { type: "string" },
        iso: { type: "string",
          description: "Isolation status of the patient"
         },
        mdConsult: { type: "string" },
        neuro: {
          type: "object",
          description: "Neurological system status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the neurological system (e.g., 'normal', 'abnormal')"
            },
            details: { 
              type: "string",
              description: "General details about the neurological system's condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific neurological examination findings (e.g., mental status, cranial nerves, motor/sensory function, reflexes)"
            }
          }
        },
        cardio: {
          type: "object",
          description: "Cardiovascular system status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the cardiovascular system (e.g., 'stable', 'unstable')"
            },
            details: { 
              type: "string",
              description: "General details about the cardiovascular system's condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific cardiovascular examination findings (e.g., heart sounds, pulses, edema)"
            }
          }
        },
        respiratory: {
          type: "object",
          description: "Respiratory system status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the respiratory system (e.g., 'clear', 'distressed')"
            },
            details: { 
              type: "string",
              description: "General details about the respiratory system's condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific respiratory examination findings (e.g., breath sounds, respiratory rate and pattern, use of accessory muscles)"
            }
          }
        },
        giGu:  {
          type: "object",
          description: "Gastrointestinal and genitourinary systems status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the GI/GU systems (e.g., 'normal', 'abnormal')"
            },
            details: { 
              type: "string",
              description: "General details about the GI/GU systems' condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific GI/GU examination findings (e.g., abdominal exam, bowel sounds, urinary output)"
            }
          }
        },
        endocrine: { type: "string",
          description: "Endocrine system status and examination findings"
         },
        skinMobility: {
          type: "object",
          description: "Skin status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the skin (e.g., 'intact', 'compromised')"
            },
            details: { 
              type: "string",
              description: "General details about the skin's condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific skin examination findings (e.g., color, turgor, presence of lesions or wounds)"
            }
          }
        },
        labs: {
          type: "object",
          properties: {
            bnp: { type: "string",
              description: "B-type natriuretic peptide"
             },
            ck: { type: "string",
              description: "Creatine kinase"
             },
            trop: { type: "string",
              description: "Troponin"
             },
            wbc: { type: "string",
              description: "White blood cell count"
             },
            hgb: { type: "string",
              description: "Hemoglobin"
             },
            hct: { type: "string",
              description: "Hematocrit"
             },
            plt: { type: "string",
              description: "Platelet count"
             },
            tbil: { type: "string",
              description: "Total bilirubin"
             },
            alkP: { type: "string",
              description: "Alkaline phosphatase"
             },
            ast: { type: "string",
              description: "Aspartate aminotransferase"
             },
            alt: { type: "string",
              description: "Alanine aminotransferase"
             },
            na: { type: "string",
              description: "Sodium"
             },
            k: { type: "string",
              description: "Potassium"
             },
            cl: { type: "string",
              description: "Chloride"
             },
            co2: { type: "string",
              description: "Carbon dioxide"
             },
            bun: { type: "string",
              description: "Blood urea nitrogen"
             },
            gluc: { type: "string",
              description: "blood glucose"
             },
            creat: { type: "string",
              description: "Creatinine"
             },
            ptInr: { type: "string",
              description: "Prothrombin time"
             },
              ptt: { type: "string",
              description: "Partial thromboplastin time"
             }
          }
        },
        imagingRadiology: { type: "string",
          description: "Imaging or radiology performed or ordered and any findings"
         },
        linesTubes: { type: "array", items: { type: "string" },
          description: "Lines and tubes currently in place"
         },
        notesPlan: { type: "string",
          description: "Any additional notes or comments about the patient's condition or care plan"
         }
      }
    }
  },
  nurseForm4: {
    systemMessage: "You are a specialized nurse data extraction assistant. Extract relevant nurse information from the given text and structure it according to the NurseFormProps4 interface.",
    functionName: "fill_nurse_form_4",
    functionDescription: "Fill in the specialized nurse form with extracted nurse information",
    functionParameters: {
      type: "object",
      properties: {
        diagnosis: { type: "string",
          description: "Current, active medical conditions only. Do not include past medical history here. separate each condition with a comma.",
         },
        pmh: { type: "string",
          description: "Past medical history, including chronic conditions. separate each condition with a comma."
         },
        neuro: {
          type: "object",
          description: "Neurological system status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the neurological system (e.g., 'normal', 'abnormal')"
            },
            details: { 
              type: "string",
              description: "General details about the neurological system's condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific neurological examination findings (e.g., mental status, cranial nerves, motor/sensory function, reflexes)"
            }
          }
        },
        cards: {
          type: "object",
          description: "Cardiovascular system status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the cardiovascular system (e.g., 'stable', 'unstable')"
            },
            details: { 
              type: "string",
              description: "General details about the cardiovascular system's condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific cardiovascular examination findings (e.g., heart sounds, pulses, edema)"
            }
          }
        },
        resp: {
          type: "object",
          description: "Respiratory system status and examination findings",
          properties: {
            status: { 
              type: "string",
              description: "Overall status of the respiratory system (e.g., 'clear', 'distressed')"
            },
            details: { 
              type: "string",
              description: "General details about the respiratory system's condition"
            },
            physicalExam: { 
              type: "string",
              description: "Specific respiratory examination findings (e.g., breath sounds, respiratory rate and pattern, use of accessory muscles)"
            }
          }
        },
        gi: { type: "string",
          description: "Gastrointestinal system status and examination findings"
         },
        gu: { type: "string",
          description: "Genitourinary system status and examination findings"
         },
        skinWound: { type: "string",
          description: "Skin status and examination findings"
         },
        vitals: {
          type: "object",
          properties: {
            temperature: { type: "string",
              description: "Body temperature"
               },
            bp: { type: "string",
              description: "Blood pressure"
             },
            hr: { type: "string",
              description: "Heart rate"
             },
            o2: { type: "string",
              description: "Oxygen saturation"
               },
            respiratoryRate: { type: "string",
              description: "Respiratory rate"
             },
            ls: { type: "string",
              description: "Lung sounds"
             }
          }
        },
        labs: {
          type: "object",
          properties: {
            bnp: { type: "string",
              description: "B-type natriuretic peptide"
               },
            ck: { type: "string",
              description: "Creatine kinase"
             },
            trop: { type: "string",
              description: "Troponin"
             },
            wbc: { type: "string",
              description: "White blood cell count"
             },
            hgb: { type: "string",
              description: "Hemoglobin"
               },
            hct: { type: "string",
              description: "Hematocrit"
             },
            plt: { type: "string",
              description: "Platelet count"
             },
            tbil: { type: "string",
              description: "Total bilirubin"
             },
            alkP: { type: "string",
              description: "Alkaline phosphatase"
             },
            ast: { type: "string",
              description: "Aspartate aminotransferase"
             },
            alt: { type: "string",
              description: "Alanine aminotransferase"
             },
            na: { type: "string",
              description: "Sodium"
             },
            k: { type: "string",
              description: "Potassium"
             },
            cl: { type: "string",
              description: "Chloride"
             },
            co2: { type: "string",
              description: "Carbon dioxide"
             },
            bun: { type: "string",
              description: "Blood urea nitrogen"
             },
            gluc: { type: "string",
              description: "Blood glucose",
            },
            creat: { type: "string",
              description: "Creatinine"
             },
            ptInr: { type: "string",
              description: "Prothrombin time"
             },
            ptt: { type: "string",
              description: "Partial thromboplastin time"
             }
          }
        },
        meds: { type: "string",
          description: "Medications currently being taken"
         },
        fs: { type: "string",
          description: "Fluid and salt intake"
         },
        cathEpLab: {
          type: "object",
          properties: {
            fent: { type: "string",
              description: "Fentanyl dose and rate"
             },
            versed: { type: "string",
              description: "Versed dose and rate"
             },
            cont: { type: "string",
              description: "Continuous drips"
             },
            ivf: { type: "string",
              description: "Intravenous fluid"
             }
          }
        },
        plans: { type: "string" },
        callMD: {
          type: "object",
          properties: {
            hrLow: { type: "string",
              description: "Low heart rate"
             },
            hrHigh: { type: "string",
              description: "High heart rate"
             },
            sbpLow: { type: "string",
              description: "Low systolic blood pressure"
             },
            sbpHigh: { type: "string",
              description: "High systolic blood pressure"
             },
            dbpHigh: { type: "string",
              description: "High diastolic blood pressure"
             },
            tHigh: { type: "string",
              description: "High temperature"
             },
            rrLow: { type: "string",
              description: "Low respiratory rate"
             },
              rrHigh: { type: "string",
              description: "High respiratory rate"
             },
            o2Low: { type: "string",
              description: "Low oxygen saturation"
             },
            pttHigh: { type: "string",
              description: "High partial thromboplastin time"
             }
          }
        },
        activity: { type: "string",
          description: "Activity level of the patient"
         },
        precaution: { type: "string" },
        diet: { type: "string" },
        nameAge: { type: "string" },
        code: { type: "string" },
        allergy: { type: "string",
          description: "Allergies to medications, foods, or environmental factors"
         },
        md: { type: "string",
          description: "Name of the doctor"
         },
        lc: { type: "string" },
        rm: { type: "string",
          description: "Room number"
         }
      }
    }
  }
};

export async function POST(request: Request) {
  const { transcription, formType } = await request.json();

  if (!(formType in formPrompts)) {
    return NextResponse.json(
      { error: 'Invalid form type' },
      { status: 400 }
    );
  }

  const prompt = formPrompts[formType as keyof typeof formPrompts];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: prompt.systemMessage },
        { role: "user", content: transcription }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: prompt.functionName,
            description: prompt.functionDescription,
            parameters: prompt.functionParameters
          }
        }
      ],
      tool_choice: { type: "function", function: { name: prompt.functionName } }
    });

    console.log('OpenAI API Response:', JSON.stringify(completion, null, 2));

    const message = completion.choices[0].message;
    if (!message || !message.tool_calls || message.tool_calls.length === 0) {
      throw new Error('Unexpected API response structure');
    }

    const functionCall = message.tool_calls[0].function;
    const result = JSON.parse(functionCall.arguments);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error analyzing transcription:', error);
    return NextResponse.json(
      { error: 'Error analyzing transcription', details: (error as Error).message },
      { status: 500 }
    );
  }
}