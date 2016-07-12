import{Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput, MdHint} from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators} from '@angular/forms';

/**
 * Custom items
 */
import {AlertMessage, AlertMessageType} from '../base/alert-message';
import {AlertMessageService} from '../base/alert-message.service';
import {StringToDatePipe} from '../base/string-to-date.pipe';
import{CourseService} from './course.service'
import{Course} from './course.model'
import{Exam} from './exam.model'

/**
 * Courses management
 */
@Component({
    moduleId: module.id,
    selector: 'course-exams',
    templateUrl: './course-exams.component.html',
    styleUrls: [],
    directives: [
        MD_SIDENAV_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdButton,
        MdInput,
        MdHint,
        MdIcon,
        ROUTER_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES
    ],
    providers: [CourseService],
    pipes: [StringToDatePipe]
})
/**
 *
 */
export class CourseExamsComponent {
    course:Course; // course to edit
    selectedExam:Exam; // Exam selected
    newExam:FormGroup; // New exams to add
    showForm:boolean = false;

    constructor(private fb:FormBuilder, private courseSvc:CourseService, private alertMessageService:AlertMessageService, private router:Router, private activatedRoute:ActivatedRoute) {
    }


    /**
     * Initialization tasks
     */
    ngOnInit() {
        // Initialize the new exams with one item such that it can be added
        /**
         * Load the parameters
         */
        this.activatedRoute.params.subscribe(params => {
                // Load the affected course
                this.courseSvc.get(params['id']).subscribe(course => {
                        this.course = course;
                    },
                    // Error fetching the course
                    error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
                )
            },
            // Error reading parameters
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     */
    updateList() {
        this.courseSvc.index().subscribe(
            courses => {
            },
            error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
        );
    }

    /**
     * Add a new exam to the course
     */
    submitExam() {
        /**
         * Add exam: add to the course's exam list and store it
         */
        if (this.newExam && this.newExam.value) {
            // Update the values of the existing exam
            if (this.newExam.value._id) {
                for (var i = 0; i < this.course.exams.length; i++) {
                    var exam = this.course.exams[i];
                    if (exam._id == this.newExam.value._id) {
                        exam.date = this.newExam.value.date;
                        exam.name = this.newExam.value.name;
                    }
                }
            }
            else{
                // Otherwise, add a new exam to the array
                this.course.exams.push(
                    new Exam({
                        name: this.newExam.value.name,
                        date: this.newExam.value.date,
                    })
                );
            }
            this.courseSvc.update(this.course).subscribe(course=> {
                    this.course = course;
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Course has been updated'));
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }

        this.showForm=false;
    }


    /**
     * Add a new exam
     */
    addExam(){
        this.showForm=true;
        // Prepare form for another entry
        this.newExam =
            this.fb.group({
                    _id: [],
                    name: ['', Validators.required],
                    date: [],
                }
            );
    }
    
    /**
     * Edit an existing exam
     * @param exam
     */
    editExam(exam:Exam, idx:number) {
        this.showForm=true;
        this.newExam = this.fb.group({
                    _id: [exam._id],
                    name: [exam.name, Validators.required],
                    date: [exam.date],
                }
            );
    }

    /**
     * Delete an exam
     * @param exam
     */
    deleteExam(exam:Exam, idx:number) {
        // Deleting consists of removing the exam from the course and save this course
        if (confirm('Delete exam? This operation cannot be undone!')) {
            this.courseSvc.update(this.course).subscribe(course=> {
                    this.course = course;
                    this.course.exams.splice(idx, 1);
                    this.alertMessageService.add(new AlertMessage(AlertMessageType.SUCCESS, 'Course has been updated'));
                },
                error => this.alertMessageService.add(new AlertMessage(AlertMessageType.DANGER, error))
            );
        }
    }


}

