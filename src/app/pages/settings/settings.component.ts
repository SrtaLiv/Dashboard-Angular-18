import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  // Appearance settings
  selectedTheme: string = 'light';
  animations: boolean = true;
  
  // Profile settings
  profileImage: string | null = null;
  
  // Notification settings
  emailNotifications: boolean = true;
  pushNotifications: boolean = true;
  courseUpdates: boolean = true;
  
  // Privacy settings
  showProfile: boolean = true;
  shareActivity: boolean = false;
  dataRetention: string = '90';

  constructor(private snackBar: MatSnackBar) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length) {
      const file = input.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        this.snackBar.open('Please select an image file', 'Close', { duration: 3000 });
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.snackBar.open('Image size should be less than 5MB', 'Close', { duration: 3000 });
        return;
      }
      
      // Read the file and convert to data URL
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
        
        // Save the image to local storage
        localStorage.setItem('profileImage', this.profileImage);
        
        this.snackBar.open('Profile picture updated successfully', 'Close', { duration: 3000 });
      };
      reader.readAsDataURL(file);
    }
  }

  saveSettings() {
    localStorage.setItem('emailNotifications', this.emailNotifications.toString());
    localStorage.setItem('pushNotifications', this.pushNotifications.toString());
    localStorage.setItem('courseUpdates', this.courseUpdates.toString());
    localStorage.setItem('showProfile', this.showProfile.toString());
    localStorage.setItem('shareActivity', this.shareActivity.toString());
    localStorage.setItem('dataRetention', this.dataRetention);
    
    this.snackBar.open('Settings saved successfully', 'Close', { duration: 3000 });
  }

  ngOnInit() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profileImage = savedImage;
    }
    
    this.emailNotifications = localStorage.getItem('emailNotifications') === 'true';
    this.pushNotifications = localStorage.getItem('pushNotifications') === 'true';
    this.courseUpdates = localStorage.getItem('courseUpdates') === 'true';
    this.showProfile = localStorage.getItem('showProfile') === 'true';
    this.shareActivity = localStorage.getItem('shareActivity') === 'true';
    this.dataRetention = localStorage.getItem('dataRetention') || '90';
  }
}
