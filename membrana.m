function z=membrana(bordo, carico, r)
  m=size(bordo,1);
  n=size(bordo,2);
  z=carico;
  tic;
  for k=1:r
    z_old=z;
    for i=2:m-1
      for j=2:n-1
        # Jacobi (usa uno "z1" sugli elementi "vecchi")
        z(i,j)=(-1/4)*(carico(i,j)-z_old(i-1,j)-z(i+1,j)-z_old(i,j-1)-z(i,j+1));
      endfor
    endfor
  endfor
  tempoJ=toc
  tic;
  for k=1:r
    z_old=z;
    for i=2:m-1
      for j=2:n-1
        # Gauss-Seidel (usa elementi "nuovi")
        z(i,j)=(-1/4)*(carico(i,j)-z(i-1,j)-z(i+1,j)-z(i,j-1)-z(i,j+1));
      endfor
    endfor
  endfor
  tempoG=toc
endfunction