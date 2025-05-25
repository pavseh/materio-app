from django.views.generic import TemplateView
from .models import College, Organization, OrgMember, Program, Student
from web_project import TemplateLayout
from django.shortcuts import render
from django.db.models.functions import TruncDate
from django.db.models import Count
import json


"""
This file is a view controller for multiple pages as a module.
Here you can override the page view layout.
Refer to dashboards/urls.py file for more pages.
"""

class DashboardsView(TemplateView):
    def get_context_data(self, **kwargs):
        context = TemplateLayout.init(self, super().get_context_data(**kwargs))
        context['colleges_count'] = College.objects.count()
        context['organizations_count'] = Organization.objects.count()
        context['programs_count'] = Program.objects.count()
        context['students_count'] = Student.objects.count()

        # Users / Students
        students = Student.objects.select_related('program').all()[:63]
        
        context['student_data1'] = {
            'firstname': students[0].firstname,
            'lastname': students[0].lastname,
            'student_id': students[0].student_id,
            'program_name': students[0].program.prog_name
        }
        
        context['student_data2'] = {
            'firstname': students[1].firstname,
            'lastname': students[1].lastname,
            'student_id': students[1].student_id,
            'program_name': students[1].program.prog_name
        }

        context['student_data3'] = {
            'firstname': students[2].firstname,
            'lastname': students[2].lastname,
            'student_id': students[2].student_id,
            'program_name': students[2].program.prog_name
        }

        context['student_data4'] = {
            'firstname': students[3].firstname,
            'lastname': students[3].lastname,
            'student_id': students[3].student_id,
            'program_name': students[3].program.prog_name
        }

        context['student_data5'] = {
            'firstname': students[4].firstname,
            'lastname': students[4].lastname,
            'student_id': students[4].student_id,
            'program_name': students[4].program.prog_name
        }

        context['student_data6'] = {
            'firstname': students[5].firstname,
            'lastname': students[5].lastname,
            'student_id': students[5].student_id,
            'program_name': students[5].program.prog_name
        }

        context['student_data7'] = {
            'firstname': students[54].firstname,
            'lastname': students[54].lastname,
            'student_id': students[54].student_id,
            'program_name': students[54].program.prog_name
        }

        context['student_data8'] = {
            'firstname': students[62].firstname,
            'lastname': students[62].lastname,
            'student_id': students[62].student_id,
            'program_name': students[62].program.prog_name
        }

        


        # Student Count
        daily_counts = (
            Student.objects
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        context['student_chart_labels'] = json.dumps([str(item['date']) for item in daily_counts])
        context['student_chart_data'] = json.dumps([item['count'] for item in daily_counts])
        
        # Top 3 programming languages
        students_count = Student.objects.all()
        context['django_users_count'] = students_count[:30]
        context['javascript_users_count'] = students_count[30:50]
        context['aviato_users_count'] = students_count[50:64]

        # Organziations
        orgs = Organization.objects.annotate(member_count=Count('orgmember'))
        context['orgs_labels'] = json.dumps([org.name for org in orgs])
        context['orgs_counts'] = json.dumps([1 for _ in orgs])
        
        # Colleges Programs
        programs = Program.objects.all()
        context['programs_labels'] = json.dumps([prog.prog_name for prog in programs])
        context['programs_counts'] = json.dumps([1 for _ in programs])
        
        # Fetching Program Name Data (First 5 only)
        programsList = Program.objects.all()[:5]

        context['program_data1'] = {
            'program_name': programsList[0].prog_name
        }

        context['program_data2'] = {
            'program_name': programsList[1].prog_name
        }
        context['program_data3'] = {
            'program_name': programsList[2].prog_name
        }

        context['program_data4'] = {
            'program_name': programsList[3].prog_name
        }

        context['program_data5'] = {
            'program_name': programsList[4].prog_name
        }

        # Fetching College Data
        colleges = College.objects.all()[:8]
        
        context['college_data1'] = {
            'college_name': colleges[0].college_name
        }
        
        context['college_data2'] = {
            'college_name': colleges[1].college_name
        }
        
        context['college_data3'] = {
            'college_name': colleges[2].college_name
        }
        
        context['college_data4'] = {
            'college_name': colleges[3].college_name
        }
        
        context['college_data5'] = {
            'college_name': colleges[4].college_name
        }
        
        context['college_data6'] = {
            'college_name': colleges[5].college_name
        }
        
        context['college_data7'] = {
            'college_name': colleges[6].college_name
        }
        
        context['college_data8'] = {
            'college_name': colleges[7].college_name
        }

        context['colleges_labels'] = json.dumps([college.college_name for college in colleges])
        context['colleges_counts'] = json.dumps([1 for _ in colleges])

    
        return context

    # old template view - static data
    # class DashboardsView(TemplateView):
#     # Predefined function
#     def get_context_data(self, **kwargs):
#         # A function to init the global layout. It is defined in web_project/__init__.py file
#         context = TemplateLayout.init(self, super().get_context_data(**kwargs))

#         return context