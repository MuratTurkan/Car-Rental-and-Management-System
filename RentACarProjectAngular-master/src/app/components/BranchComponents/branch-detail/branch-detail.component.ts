import { BranchService } from './../../../services/branch.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BranchDetailDto } from 'src/app/models/branchDetailDto';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css'],
})
export class BranchDetailComponent implements OnInit {
  branchDetailDto: BranchDetailDto = {
    branchId: null,
    branchName: null,
    cityName: null,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['branchId']) {
        this.branchService.getBranchDetailDtos().subscribe((response) => {
          this.branchDetailDto = response.data.find(
            (b) => b.branchId == params['branchId']
          );
        });
      }
    });
  }
}
