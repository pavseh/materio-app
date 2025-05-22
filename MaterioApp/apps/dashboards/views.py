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
        
        # Student Count for the graph
        daily_counts = (
            Student.objects
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        context['student_chart_labels'] = json.dumps([str(item['date']) for item in daily_counts])
        context['student_chart_data'] = json.dumps([item['count'] for item in daily_counts])
        return context

    def dashboard_analytics(request):
        students_count = Student.objects.all()
        django_users_count = students_count[:30]
        javascript_users_count = students_count[30:50]
        aviato_users_count = students_count[50:64]

        context = {
            'django_users_count': django_users_count,
            'javascript_users_count': javascript_users_count,
            'aviato_users_count': aviato_users_count,
        }
        return render(request, 'dashboard_analytics.html', context)

    # old template view - static data
    # class DashboardsView(TemplateView):
#     # Predefined function
#     def get_context_data(self, **kwargs):
#         # A function to init the global layout. It is defined in web_project/__init__.py file
#         context = TemplateLayout.init(self, super().get_context_data(**kwargs))

#         return context