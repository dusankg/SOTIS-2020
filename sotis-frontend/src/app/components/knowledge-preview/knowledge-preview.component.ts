import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewNodeDialogComponent } from '../new-node-dialog/new-node-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { LinkDialogComponent } from '../link-dialog/link-dialog.component';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { VezaDTO } from 'src/app/model/VezaDTO';
import { ProstorZnanja } from 'src/app/model/ProstorZnanja';
import { Veza } from 'src/app/model/Veza';
import { Predmet } from 'src/app/model/predmet';
import { Cvor } from 'src/app/model/Cvor';

@Component({
  selector: 'app-knowledge-preview',
  templateUrl: './knowledge-preview.component.html',
  styleUrls: ['./knowledge-preview.component.css']
})
export class KnowledgePreviewComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  update$: Subject<boolean> = new Subject();
  label!: string;

  nodes: Cvor[] = []
  // = [
  //   {
  //     id: 'A',
  //     label: 'A'
  //   }, {
  //     id: 'B',
  //     label: 'B'
  //   }, {
  //     id: 'C',
  //     label: 'C'
  //   }, {
  //     id: 'D',
  //     label: 'D'
  //   }, {
  //     id: 'E',
  //     label: 'E'
  //   }
  // ]

  links: VezaDTO[] = []
  // = [
  //   {
  //     id: 'a',
  //     source: 'A',
  //     target: 'B',
  //     label: 'is parent of'
  //   }, {
  //     id: 'b',
  //     source: 'A',
  //     target: 'C',
  //     label: 'custom label'
  //   }, {
  //     id: 'c',
  //     source: 'B',
  //     target: 'D',
  //     label: 'custom label'
  //   }, {
  //     id: 'd',
  //     source: 'B',
  //     target: 'E',
  //     label: 'custom label'
  //   }
  // ]

  constructor(public dialog: MatDialog, private knowledgeService: KnowledgeService) {
    var ZAKUCANO = 100
    knowledgeService.getGraph(ZAKUCANO).subscribe(data => {
      this.nodes = data.cvorovi
      for (let v of data.veze) {
        this.links.push(new VezaDTO(v))
      }
    })

  }

  ngOnInit(): void {
  }

  onNodeSelect(node: any) {
    const dialogRef = this.dialog.open(NewNodeDialogComponent, {
      width: '250px',
      data: { "source": node.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.label && result.label != "") {
        this.nodes.push({
          cvorId: 0,
          id: result.label,
          label: result.label
        })
        this.links.push({
          vezaId: 0,
          id: result.label,
          source: node.id,
          target: result.label,
          label: 'custom label'
        })
        this.update$.next(true)
      }
      else if (result.source) {
        this.nodes.push({
          cvorId: 0,
          id: result.label,
          label: result.label
        })
        this.update$.next(true)
      }

    });

  }

  addLink(event: any) {
    const dialogRef = this.dialog.open(LinkDialogComponent, {
      width: '250px',
      data: { "nodes": this.nodes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.links.push({
          vezaId: 0,
          id: result.source + " " + result.target,
          source: result.source,
          target: result.target,
          label: 'custom label'
        })
        this.update$.next(true)
      }
    });
  }

  saveGraph() {
    var newLinks = []
    var newNodes = []
    for (let l of this.links) {
      var sourceNode = this.findNode(l.source)
      var targetNode = this.findNode(l.target)
      if (sourceNode != null && targetNode != null) {
        newLinks.push(new Veza(l.vezaId, l.id, l.label, sourceNode, targetNode))
      }
    }
    for (let l of this.nodes) {
      newNodes.push(new Cvor(0, l.id, l.label))
    }
    var ZAKUCANO = new Predmet()
    ZAKUCANO.id=1
    var prostorZnanja = new ProstorZnanja(newNodes, newLinks, ZAKUCANO)
    console.log(prostorZnanja)
    this.knowledgeService.newGraph(prostorZnanja).subscribe()
  }

  onRightClick(node: any) {

    // this.trigger.openMenu();

    var id = (node.path[2].id)
    this.removeByAttr(this.nodes, "id", id);
    this.removeByAttr(this.links, "source", id);
    this.removeByAttr(this.links, "target", id);
    this.update$.next(true)
    return false;
  }

  findNode(id: string) {
    console.log(id)
    var i = this.nodes.length;
    while (i--) {
      console.log("/")
      console.log(this.nodes[i])
      if (
        this.nodes[i] &&
        this.nodes[i].hasOwnProperty(id) &&
        this.nodes[i].id === id

      ) {
        console.log('found')
        return this.nodes[i]
      }
    }
    return null;
  };

  removeByAttr = function (arr: any[], attr: string | number, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 && arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  centerGraph() {
    this.center$.next(true)
  }

  fitGraph() {
    this.zoomToFit$.next(true)
  }

}
